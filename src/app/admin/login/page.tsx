"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
type Mode="login"|"register";
export default function AdminLogin(){
 const [mode,setMode]=useState<Mode>("login");
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[confirmPassword,setConfirmPassword]=useState(""),[code,setCode]=useState("");
 const [codeSent,setCodeSent]=useState(false),[error,setError]=useState(""),[notice,setNotice]=useState(""),[busy,setBusy]=useState(false);
 const router=useRouter();
 async function post(action:string){const r=await fetch("/api/admin/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action,email,password,confirmPassword,code})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Request failed");return d;}
 async function requestCode(){setBusy(true);setError("");setNotice("");try{const d=await post("request-code");setCodeSent(true);setNotice(d.message||"Code sent. Check Gmail and spam folder.");}catch(e){setError(e instanceof Error?e.message:"Unable to send verification code.")}finally{setBusy(false)}}
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");setNotice("");try{await post(mode);router.push("/admin/dashboard");router.refresh();}catch(e){setError(e instanceof Error?e.message:"Unable to continue.")}finally{setBusy(false)}}
 return <main className="admin-auth-page"><div className="admin-auth-card"><div className="eyebrow">COOK OUT INDEX · CONTROL CENTER</div><h1>{mode==="login"?"Admin Login":"Owner Registration"}</h1><p>{mode==="login"?"Private owner access. Public registration is disabled by server-side owner-email allowlisting.":"Only the owner email configured in Cloudflare can register. Verify Gmail before creating the account."}</p>
 <form onSubmit={submit}>
 <label>Owner Gmail<input type="email" autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
 {mode==="register"?<><button type="button" disabled={busy||codeSent} onClick={requestCode}>{busy?"Please wait…":codeSent?"Verification code sent":"Send Gmail verification code"}</button>
 <label>Verification code<input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,"").slice(0,6))} required placeholder="6-digit code"/></label>
 <label>Enter Password<input type="password" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} minLength={14} required/><small>Minimum 14 characters.</small></label>
 <label>Confirm Password<input type="password" autoComplete="new-password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} minLength={14} required/></label></>:<label>Password<input type="password" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/></label>}
 {notice&&<div className="admin-notice">{notice}</div>}{error&&<div className="admin-error">{error}</div>}
 <button disabled={busy|| (mode==="register"&&!codeSent)}>{busy?"Please wait…":mode==="login"?"Sign in":"Verify code & create owner account"}</button></form>
 <button className="admin-link" type="button" onClick={()=>{setMode(mode==="login"?"register":"login");setError("");setNotice("");setCodeSent(false);setCode("");setPassword("");setConfirmPassword("")}}>{mode==="login"?"Owner setup":"Already registered? Sign in"}</button>
 </div></main>
}