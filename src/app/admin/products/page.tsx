"use client";
import { useEffect,useState } from "react";
type Product={id:string;name:string;slug:string;description:string|null;status:string;price_text:string|null;image_url:string|null;image_alt:string|null;featured:number;category_name:string};
export default function AdminProducts(){
 const [items,setItems]=useState<Product[]>([]),[busy,setBusy]=useState(true),[saving,setSaving]=useState<string|null>(null),[error,setError]=useState("");
 useEffect(()=>{fetch("/api/admin/products").then(async r=>{if(!r.ok)throw new Error("Unauthorized");return r.json()}).then(d=>setItems(d.items||[])).catch(e=>setError(e.message)).finally(()=>setBusy(false))},[]);
 function change(id:string,key:string,value:string|boolean){setItems(xs=>xs.map(x=>x.id===id?{...x,[key]:value}:x))}
 async function save(p:Product){setSaving(p.id);setError("");try{const r=await fetch("/api/admin/products",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(p)});if(!r.ok)throw new Error((await r.json()).error||"Save failed")}catch(e){setError(e instanceof Error?e.message:"Save failed")}finally{setSaving(null)}}
 if(busy)return <main className="container section"><h1>Products</h1><p>Loading…</p></main>;
 return <main className="container section admin-editor"><div className="eyebrow">CONTROL CENTER · PRODUCTS</div><h1>Product Manager</h1><p className="muted">Every product has its own editable media source, alt text, status and content. Only approve images that genuinely match the product.</p>{error&&<div className="admin-error">{error}</div>}<div className="admin-product-list">{items.map(p=><article className="admin-product-row" key={p.id}>
 <div className="admin-product-thumb">{p.image_url?<img src={p.image_url} alt={p.image_alt||p.name}/>:<span>NO VERIFIED IMAGE</span>}</div>
 <div className="admin-product-fields"><div className="admin-product-title"><strong>{p.name}</strong><small>{p.category_name} · /menu/{p.slug}</small></div>
 <label>Name<input value={p.name} onChange={e=>change(p.id,"name",e.target.value)}/></label>
 <label>Description<textarea value={p.description||""} onChange={e=>change(p.id,"description",e.target.value)}/></label>
 <div className="admin-field-grid"><label>Price<input value={p.price_text||""} onChange={e=>change(p.id,"price_text",e.target.value)}/></label><label>Status<select value={p.status==="active"?"active":"inactive"} onChange={e=>change(p.id,"status",e.target.value)}><option value="active">Active</option><option value="inactive">Inactive</option></select></label></div>
 <label>Verified image URL<input value={p.image_url||""} onChange={e=>change(p.id,"image_url",e.target.value)} placeholder="https://…"/></label>
 <label>Image alt text<input value={p.image_alt||""} onChange={e=>change(p.id,"image_alt",e.target.value)} placeholder={p.name+" photo"}/></label>
 <label className="admin-check"><input type="checkbox" checked={!!p.featured} onChange={e=>change(p.id,"featured",e.target.checked)}/> Featured product</label>
 <button onClick={()=>save(p)} disabled={saving===p.id}>{saving===p.id?"Saving…":"Save product"}</button></div>
 </article>)}</div></main>
}