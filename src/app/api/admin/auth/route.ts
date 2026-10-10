import { NextResponse } from "next/server";
import { createSession, getAdminFromRequest, hashPassword, sessionCookie, verifyPassword, audit } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type Env = { OWNER_EMAIL?: string; RESEND_API_KEY?: string; RESEND_FROM_EMAIL?: string };
const reply=(data:unknown,status=200)=>NextResponse.json(data,{status});
const norm=(value:string)=>value.trim().toLowerCase();
async function sha256(value:string){return Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(value)))).map(b=>b.toString(16).padStart(2,"0")).join("");}
function getEnv():Env{return getCloudflareContext().env as unknown as Env;}
async function sendCode(email:string,code:string,e:Env){
 if(!e.RESEND_API_KEY||!e.RESEND_FROM_EMAIL)throw new Error("Email verification is not configured. Set RESEND_API_KEY and RESEND_FROM_EMAIL in Cloudflare Worker secrets.");
 const response=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+e.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:e.RESEND_FROM_EMAIL,to:[email],subject:"Cook Out Index owner verification code",text:"Your owner registration verification code is "+code+". It expires in 10 minutes. If you did not request it, ignore this email."})});
 if(!response.ok)throw new Error("Email provider rejected the message. Check your sender configuration.");
}
export async function POST(request:Request){
 try{
  const contentType=request.headers.get("content-type")||"";
  const body=(contentType.includes("application/json")?await request.json():Object.fromEntries((await request.formData()).entries())) as Record<string,string>;
  const action=body.action||"login",email=norm(String(body.email||"")),password=String(body.password||"");
  const db=getDatabase(),e=getEnv();
  if(action==="request-code"){
   const ownerEmail=norm(e.OWNER_EMAIL||"");
   if(!ownerEmail||!e.RESEND_API_KEY||!e.RESEND_FROM_EMAIL)return reply({error:"Owner email verification is not configured. Configure OWNER_EMAIL, RESEND_API_KEY and RESEND_FROM_EMAIL in Cloudflare Worker secrets."},503);
   if(!email||email!==ownerEmail)return reply({error:"This email is not authorized to register the owner account."},403);
   const existing=await db.prepare("SELECT id FROM admin_accounts LIMIT 1").all() as {results?:unknown[]};
   if(existing.results?.length)return reply({error:"Owner registration is closed. Please sign in."},409);
   const recent=await db.prepare("SELECT COUNT(*) AS count FROM admin_email_verifications WHERE email=? AND created_at>?").bind(email,new Date(Date.now()-3600000).toISOString()).all() as {results?:Array<{count:number}>};
   if((recent.results?.[0]?.count||0)>=3)return reply({error:"Too many code requests. Try again in one hour."},429);
   const code=String(crypto.getRandomValues(new Uint32Array(1))[0]%1000000).padStart(6,"0"),now=new Date().toISOString();
   const id=crypto.randomUUID();
   await db.prepare("INSERT INTO admin_email_verifications (id,email,code_hash,expires_at,attempts,created_at) VALUES (?,?,?,?,0,?)").bind(id,email,await sha256(code),new Date(Date.now()+600000).toISOString(),now).all();
   try{await sendCode(email,code,e);}catch(err){await db.prepare("DELETE FROM admin_email_verifications WHERE id=?").bind(id).all();return reply({error:err instanceof Error?err.message:"Unable to send verification email."},503);}
   return reply({ok:true,message:"Verification code sent. Check Gmail inbox and spam."});
  }
  if(action==="register"){
   if(!e.OWNER_EMAIL||email!==norm(e.OWNER_EMAIL))return reply({error:"Only the configured owner email can register."},403);
   if(!password||password.length<14)return reply({error:"Use a password of at least 14 characters."},400);
   if(password!==String(body.confirmPassword||""))return reply({error:"Passwords do not match."},400);
   const existing=await db.prepare("SELECT id FROM admin_accounts LIMIT 1").all() as {results?:unknown[]};
   if(existing.results?.length)return reply({error:"Owner registration is closed. Please sign in."},409);
   const code=String(body.code||"").trim();
   if(!/^\d{6}$/.test(code))return reply({error:"Enter the six-digit Gmail verification code."},400);
   const rows=await db.prepare("SELECT id,code_hash,expires_at,attempts,verified_at FROM admin_email_verifications WHERE email=? ORDER BY created_at DESC LIMIT 1").bind(email).all() as {results?:Array<{id:string;code_hash:string;expires_at:string;attempts:number;verified_at:string|null}>};
   const v=rows.results?.[0];
   if(!v||v.verified_at||Date.parse(v.expires_at)<Date.now()||v.attempts>=5)return reply({error:"Code expired or locked. Request a new code."},400);
   if(await sha256(code)!==v.code_hash){await db.prepare("UPDATE admin_email_verifications SET attempts=attempts+1 WHERE id=?").bind(v.id).all();return reply({error:"Incorrect verification code."},400);}
   // Consume the code before account creation; the first-account constraint is rechecked above.
   await db.prepare("UPDATE admin_email_verifications SET verified_at=? WHERE id=? AND verified_at IS NULL").bind(new Date().toISOString(),v.id).all();
   const id=crypto.randomUUID(),created=new Date().toISOString();
   await db.prepare("INSERT INTO admin_accounts (id,email,password_hash,role,status,created_at) VALUES (?,?,?,?,?,?)").bind(id,email,await hashPassword(password),"owner","active",created).all();
   const token=await createSession(id);await audit(id,"register","admin",id,{email});
   return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":sessionCookie(token)}});
  }
  if(action==="logout"){
   const admin=await getAdminFromRequest(request);
   if(admin)await db.prepare("DELETE FROM admin_sessions WHERE admin_id=?").bind(admin.id).all();
   return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":"cookout_admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"}});
  }
  if(!email||!password)return reply({error:"Email and password are required."},400);
  if(!e.OWNER_EMAIL||email!==norm(e.OWNER_EMAIL))return reply({error:"Invalid email or password."},401);
  const rows=await db.prepare("SELECT id,email,password_hash,role,status FROM admin_accounts WHERE email=? LIMIT 1").bind(email).all() as {results?:Array<{id:string;email:string;password_hash:string;role:string;status:string}>};
  const admin=rows.results?.[0];
  if(!admin||admin.status!=="active"||!(await verifyPassword(password,admin.password_hash)))return reply({error:"Invalid email or password."},401);
  const token=await createSession(admin.id);
  await db.prepare("UPDATE admin_accounts SET last_login_at=? WHERE id=?").bind(new Date().toISOString(),admin.id).all();
  await audit(admin.id,"login","admin",admin.id);
  return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":sessionCookie(token)}});
 }catch{return reply({error:"Authentication service failed. Confirm migrations and Cloudflare Worker secrets."},503);}
}