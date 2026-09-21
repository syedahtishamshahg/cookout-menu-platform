import Link from "next/link";
import {listNutrition} from "@/lib/repository";

export const dynamic="force-dynamic";
export const metadata={title:"Cook Out Nutrition",description:"Source-aware Cook Out nutrition information from the site's database."};

export default async function Nutrition(){
  const items=await listNutrition();
  return <main className="container section">
    <div className="eyebrow">Nutrition Explorer</div>
    <h1>Cook Out Nutrition</h1>
    <p className="muted">Nutrition values shown here come from records stored in our source-aware database. Always check the cited source for the latest information.</p>
    <div className="card" style={{overflowX:"auto",marginTop:24}}>
      <table style={{width:"100%",borderCollapse:"collapse"}}>
        <thead><tr><th align="left">Item</th><th align="right">Calories</th><th align="right">Protein</th><th align="right">Sodium</th></tr></thead>
        <tbody>{items.map(item=><tr key={item.id}>
          <td style={{padding:"12px 0"}}><Link href={"/menu/"+item.slug}>{item.name}</Link></td>
          <td align="right">{item.calories??"—"}</td><td align="right">{item.protein_g!=null?item.protein_g+"g":"—"}</td><td align="right">{item.sodium_mg!=null?item.sodium_mg+"mg":"—"}</td>
        </tr>)}</tbody>
      </table>
    </div>
    {items.length===0&&<p className="muted" style={{marginTop:16}}>No nutrition records are currently published.</p>}
    <p style={{marginTop:20}}><Link href="/sources/">View source policy</Link></p>
  </main>;
}