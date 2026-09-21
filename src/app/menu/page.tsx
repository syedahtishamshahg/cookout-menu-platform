import Link from "next/link";
import {listMenuItems} from "@/lib/repository";

export const dynamic="force-dynamic";
export const metadata={title:"Cook Out Menu",description:"Browse independent Cook Out menu information with source-aware nutrition details."};

export default async function Menu(){
  const items=await listMenuItems();
  const groups=items.reduce<Record<string,typeof items>>((acc,item)=>{(acc[item.category_name]??=[]).push(item);return acc;},{});
  return <main className="container section">
    <div className="eyebrow">Menu Explorer</div>
    <h1>Cook Out Menu</h1>
    <p className="muted">Browse menu items currently available in our source-backed database. Prices vary by location.</p>
    {Object.entries(groups).map(([category,categoryItems])=><section key={category} style={{marginTop:32}}>
      <h2>{category}</h2>
      <div className="grid">{categoryItems.map(item=><Link className="card" href={"/menu/"+item.slug} key={item.slug}>
        <h3>{item.name}</h3><p className="muted">{item.description}</p>
        {item.last_checked&&<small className="muted">Last checked: {item.last_checked}</small>}
      </Link>)}</div>
    </section>)}
    {items.length===0&&<div className="card" style={{marginTop:24}}><p>No menu items are currently published.</p></div>}
  </main>;
}