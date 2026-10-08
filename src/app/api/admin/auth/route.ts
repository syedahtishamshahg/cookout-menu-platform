import { NextResponse } from "next/server";
import { createSession, getAdminFromRequest, hashPassword, sessionCookie, verifyPassword } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json() as { action?:string; email?:string; password?:string };
    const action = body.action || "login";
    const email = String(body.email||"").trim().toLowerCase();
    const password = String(body.password||"");
    const db = getDatabase();

    if (action === "register") {
      if (!email || !password || password.length < 12) return NextResponse.json({error:"Use an email and a password of at least 12 characters."},{status:400});
      const count = await db.prepare("SELECT COUNT(*) AS count FROM admin_accounts").all() as {results?:Array<{count:number}>};
      if ((count.results?.[0]?.count ?? 0) > 0) return NextResponse.json({error:"Owner registration is already closed."},{status:409});
      const id=crypto.randomUUID(), created=new Date().toISOString();
      await db.prepare("INSERT INTO admin_accounts (id,email,password_hash,role,status,created_at) VALUES (?,?,?,?,?,?)")
        .bind(id,email,await hashPassword(password),"owner","active",created).all();
      const token=await createSession(id);
      return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":sessionCookie(token)}});
    }

    if (action === "logout") {
      const admin=await getAdminFromRequest(request);
      if(admin) await db.prepare("DELETE FROM admin_sessions WHERE admin_id=?").bind(admin.id).all();
      return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":"cookout_admin_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0"}});
    }

    if (!email || !password) return NextResponse.json({error:"Email and password are required."},{status:400});
    const result=await db.prepare("SELECT id,email,password_hash,role,status FROM admin_accounts WHERE email=? LIMIT 1").bind(email).all() as {results?:Array<{id:string;email:string;password_hash:string;role:string;status:string}>};
    const admin=result.results?.[0];
    if(!admin || admin.status!=="active" || !(await verifyPassword(password,admin.password_hash))) return NextResponse.json({error:"Invalid email or password."},{status:401});
    const token=await createSession(admin.id);
    await db.prepare("UPDATE admin_accounts SET last_login_at=? WHERE id=?").bind(new Date().toISOString(),admin.id).all();
    return new NextResponse(JSON.stringify({ok:true}),{headers:{"Content-Type":"application/json","Set-Cookie":sessionCookie(token)}});
  } catch { return NextResponse.json({error:"Authentication service is unavailable."},{status:500}); }
}