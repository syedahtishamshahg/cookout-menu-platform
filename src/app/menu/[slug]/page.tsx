import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {findMenuItem,getNutritionForItem} from "@/lib/repository";
import {breadcrumbJsonLd} from "@/lib/structured-data";

export const dynamic="force-dynamic";

const PHOTO_BY_CATEGORY: Record<string,string> = {
  Burgers:"https://images.pexels.com/photos/19247562/pexels-photo-19247562.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Chicken:"https://images.pexels.com/photos/34216153/pexels-photo-34216153.jpeg?auto=compress&cs=tinysrgb&w=1600",
  BBQ:"https://images.pexels.com/photos/15264024/pexels-photo-15264024.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "Hot Dogs":"https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Wraps:"https://images.pexels.com/photos/12464909/pexels-photo-12464909.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Quesadillas:"https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Sides:"https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Drinks:"https://images.pexels.com/photos/1283219/pexels-photo-1283219.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Desserts:"https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Milkshakes:"https://images.pexels.com/photos/12436857/pexels-photo-12436857.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Trays:"https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
  Other:"https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=1600"
};

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=await findMenuItem(undefined,slug);return item?{title:item.name+" | Cook Out Menu",description:item.description??"Cook Out menu item information, nutrition and source-aware details.",alternates:{canonical:"/menu/"+item.slug},openGraph:{title:item.name+" | Cook Out Menu",description:item.description??"Cook Out menu item information."}}:{title:"Menu Item"};}

export default async function ItemPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=await findMenuItem(undefined,slug);if(!item)notFound();const nutrition=await getNutritionForItem(undefined,item.id);const breadcrumbs=breadcrumbJsonLd([{name:"Menu",path:"/menu/"},{name:item.category_name,path:"/menu/"},{name:item.name,path:"/menu/"+item.slug}]);const nutritionSchema=nutrition?{"@context":"https://schema.org","@type":"NutritionInformation","calories":nutrition.calories!=null?nutrition.calories+" calories":undefined,"proteinContent":nutrition.protein_g!=null?nutrition.protein_g+" g":undefined,"sodiumContent":nutrition.sodium_mg!=null?nutrition.sodium_mg+" mg":undefined}:null;const photo=PHOTO_BY_CATEGORY[item.category_name||"Other"]||PHOTO_BY_CATEGORY.Other;return <main className="container section item-detail-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs)}} />{nutritionSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(nutritionSchema)}} />}<nav aria-label="Breadcrumb" className="muted"><Link href="/menu/">Menu</Link> / {item.category_name} / {item.name}</nav><div className="item-detail-grid"><div className="item-detail-photo"><img src={photo} alt="" /><span>REAL FOOD PHOTO · REPRESENTATIVE</span></div><div><div className="eyebrow" style={{marginTop:16}}>{item.category_name}</div><h1>{item.name}</h1><p className="muted">{item.description}</p><div className="grid" style={{marginTop:24}}><div className="card"><h2>Nutrition</h2>{nutrition?<><p><strong>{nutrition.calories??"—"}</strong> calories</p><p>{nutrition.protein_g??"—"}g protein</p><p>{nutrition.sodium_mg??"—"}mg sodium</p><p className="muted">Verified: {nutrition.verified_at??"Source date not recorded"}</p></>:<p className="muted">Nutrition data is not currently published for this item.</p>}</div><div className="card"><h2>Price</h2><p>Prices vary by location and are not published here until source-verified.</p><Link className="btn" href="/menu/prices/">View price information</Link></div><div className="card"><h2>Source & verification</h2><p>Data is served from the site's D1 database.</p><p className="muted">This is an independent, unofficial information resource.</p><Link href="/sources/">View source policy</Link></div></div></div></div><p style={{marginTop:28}}><Link href="/menu/">← Back to menu</Link></p></main>;}
