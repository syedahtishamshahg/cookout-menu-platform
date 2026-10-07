import Link from "next/link";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import {findMenuItem,getNutritionForItem} from "@/lib/repository";
import {breadcrumbJsonLd} from "@/lib/structured-data";

export const dynamic="force-dynamic";

const PHOTO_BY_ITEM: Record<string,string> = {
  "small-hamburger":"https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "regular-hamburger":"https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "huge-hamburger":"https://images.pexels.com/photos/1556688/pexels-photo-1556688.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "big-double":"https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "char-grilled-chicken-breast":"https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "hot-crispy-spicy-chicken-breast":"https://images.pexels.com/photos/60616/pexels-photo-60616.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "regular-bbq-sandwich":"https://images.pexels.com/photos/1105325/pexels-photo-1105325.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "hot-dog":"https://images.pexels.com/photos/4676409/pexels-photo-4676409.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "cajun-wrap":"https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "ranch-wrap":"https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "honey-mustard-wrap":"https://images.pexels.com/photos/5409010/pexels-photo-5409010.jpeg?auto=compress&cs=tinysrgb&w=1200",
  "chicken-strips-3":"https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=1200"
};

export async function generateMetadata/({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=await findMenuItem(undefined,slug);return item?{title:item.name+" | Cook Out Menu",description:item.description??"Cook Out menu item information, nutrition and source-aware details.",alternates:{canonical:"/menu/"+item.slug},openGraph:{title:item.name+" | Cook Out Menu",description:item.description??"Cook Out menu item information."}}:{title:"Menu Item"};}

export default async function ItemPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=await findMenuItem(undefined,slug);if(!item)notFound();const nutrition=await getNutritionForItem(undefined,item.id);const breadcrumbs=breadcrumbJsonLd([{name:"Menu",path:"/menu/"},{name:item.category_name,path:"/menu/"},{name:item.name,path:"/menu/"+item.slug}]);const nutritionSchema=nutrition?{"@context":"https://schema.org","@type":"NutritionInformation","calories":nutrition.calories!=null?nutrition.calories+" calories":undefined,"proteinContent":nutrition.protein_g!=null?nutrition.protein_g+" g":undefined,"sodiumContent":nutrition.sodium_mg!=null?nutrition.sodium_mg+" mg":undefined}:null;const photo=PHOTO_BY_ITEM[item.slug]||"https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600";return <main className="container section item-detail-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbs)}} />{nutritionSchema&&<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(nutritionSchema)}} />}<nav aria-label="Breadcrumb" className="muted"><Link href="/menu/">Menu</Link> / {item.category_name} / {item.name}</nav><div className="item-detail-grid"><div className="item-detail-photo"><img src={photo} alt="" /><span>REAL FOOD PHOTO · REPRESENTATIVE</span></div><div><div className="eyebrow" style={{marginTop:16}}>{item.category_name}</div><h1>{item.name}</h1><p className="muted">{item.description}</p><div className="grid" style={{marginTop:24}}><div className="card"><h2>Nutrition</h2>{nutrition?<><p><strong>{nutrition.calories??"—"}</strong> calories</p><p>{nutrition.protein_g??"—"}g protein</p><p>{nutrition.sodium_mg??"—"}mg sodium</p><p className="muted">Verified: {nutrition.verified_at??"Source date not recorded"}</p></>:<p className="muted">Nutrition data is not currently published for this item.</p>}</div><div className="card"><h2>Price</h2><p>Prices vary by location and are not published here until source-verified.</p><Link className="btn" href="/menu/prices/">View price information</Link></div><div className="card"><h2>Source & verification</h2><p>Data is served from the site's D1 database.</p><p className="muted">This is an independent, unofficial information resource.</p><Link href="/sources/">View source policy</Link></div></div></div></div><p style={{marginTop:28}}><Link href="/menu/">← Back to menu</Link></p></main>;}
