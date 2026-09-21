import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {findMenuItem,getNutritionForItem} from "@/lib/repository";

export const dynamic="force-dynamic";

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const item=await findMenuItem(undefined,slug);
  return item?{title:item.name+" | Cook Out Menu",description:item.description??"Cook Out menu item information.",alternates:{canonical:"/menu/"+item.slug}}:{title:"Menu Item"};
}

export default async function ItemPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const item=await findMenuItem(undefined,slug);
  if(!item)notFound();
  const nutrition=await getNutritionForItem(undefined,item.id);
  return <main className="container section">
    <nav aria-label="Breadcrumb" className="muted"><Link href="/menu/">Menu</Link> / {item.category_name} / {item.name}</nav>
    <div className="eyebrow" style={{marginTop:16}}>{item.category_name}</div>
    <h1>{item.name}</h1>
    <p className="muted">{item.description}</p>
    <div className="grid" style={{marginTop:24}}>
      <div className="card"><h2>Nutrition</h2>
        {nutrition?<><p><strong>{nutrition.calories??"—"}</strong> calories</p><p>{nutrition.protein_g??"—"}g protein</p><p>{nutrition.sodium_mg??"—"}mg sodium</p><p className="muted">Verified: {nutrition.verified_at??"Source date not recorded"}</p></>:<p className="muted">Nutrition data is not currently published for this item.</p>}
      </div>
      <div className="card"><h2>Price</h2><p>Prices vary by location and are not published here until source-verified.</p><Link className="btn" href="/menu/prices/">View price information</Link></div>
      <div className="card"><h2>Source & verification</h2><p>Data is served from the site's D1 database.</p><p className="muted">This is an independent, unofficial information resource.</p><Link href="/sources/">View source policy</Link></div>
    </div>
    <p style={{marginTop:28}}><Link href="/menu/">← Back to menu</Link></p>
  </main>;
}