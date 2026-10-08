"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin(){
 const [mode,setMode]=useState<"login"|"register">("login");
 const [email,setEmail]=useState(""),[password,setPassword]=useState(""),[error,setError]=useState(""),[busy,setBusy]=useState(false);
 const router=useRouter();
 async function submit(e:React.FormEvent){
  e.preventDefault(); setBusy(true); setError("");
  try{
   const r=await fetch("/api/admin/auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({action:mode,email,password})});
   const d=await r.json();
   if(!r.ok) throw new Error(d.error||"Unable to continue");
   router.push("/admin/dashboard"); router.refresh();
  }catch(e){setError(e instanceof Error?e.message:"Unable to continue")}finally{setBusy(false)}
 }
 return <main className="admin-auth-page"><div className="admin-auth-card">
  <div className="eyebrow">COOK OUT INDEX · CONTROL CENTER</div>
  <h1>{mode==="login"?"Admin Login":"Owner Registration"}</h1>
  <p>{mode==="login"?"Secure access to your website management dashboard.":"Create the first owner account. Registration automatically closes after the first account."}</p>
  <form onSubmit={submit}>
   <label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required /></label>
   <label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} minLength={12} required /><small>Minimum 12 characters.</small></label>
   {error&&<div className="admin-error">{error}</div>}
   <button disabled={busy}>{busy?"Please wait…":mode==="login"?"Sign in":"Create owner account"}</button>
  </form>
  <button className="admin-link" type="button" onClick={()=>{setMode(mode==="login"?"register":"login");setError("")}}>{mode==="login"?"First setup? Create owner account":"Already registered? Sign in"}</button>
 </div></main>
}