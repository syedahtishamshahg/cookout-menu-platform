import Link from "next/link";
import { listNutrition } from "@/lib/repository";

export const dynamic="force-dynamic";
export const metadata={title:"Cook Out Nutrition",description:"Source-aware Cook Out nutrition information including calories, protein and sodium."};

export default async function Nutrition(){
  const items=await listNutrition();
  const avgCalories=items.length?Math.round(items.reduce((s,x)=>s+(x.calories??0),0)/items.filter(x=>x.calories!=null).length):0;
  return <main className="container section">
    <div className="eyebrow">Nutrition Explorer</div>
    <h1>Cook Out Nutrition</h1>
    <p className="muted">Explore published nutrition records by item. Values are tied to source and verification metadata; restaurant formulations can change, so check the cited source when making dietary decisions.</p>
    <div className="grid" style={{marginTop:24}}>
      <div className="card"><strong>{items.length}</strong><p className="muted">items with published nutrition</p></div>
      <div className="card"><strong>{avgCalories||"—"}</strong><p className="muted">average calories across records with calories data</p></div>
      <div className="card"><strong>Source-backed</strong><p className="muted">nutrition records carry verification metadata</p></div>
    </div>
    <div className="card" style={{overflowX:"auto",marginTop:24}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Item</th><th align="left">Category</th><th align="right">Calories</th><th align="right">Protein</th><th align="right">Sodium</th><th align="left">Verified</th></tr></thead>
        <tbody>{items.map(item=><tr key={item.id}>
          <td style={{padding:"12px 0"}}><Link href={"/menu/"+item.slug}>{item.name}</Link></td>
          <td>{item.category_name}</td>
          <td align="right">{item.calories??"—"}</td>
          <td align="right">{item.protein_g!=null?item.protein_g+"g":"—"}</td>
          <td align="right">{item.sodium_mg!=null?item.sodium_mg+"mg":"—"}</td>
          <td>{item.verified_at??"—"}</td>
        </tr>)}</tbody>
      </table>
    </div>
    {items.length===0&&<p className="muted" style={{marginTop:16}}>No nutrition records are currently published.</p>}
    <p style={{marginTop:20}}><Link href="/sources/">View source policy</Link> · <Link href="/methodology/">How verification works</Link></p>
  </main>;
}