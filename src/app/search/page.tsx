"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { menuItems } from "@/lib/menu";

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const [query,setQuery]=useState("");
  const [submitted,setSubmitted]=useState(false);
  useMemo(()=>{ searchParams.then(p=>{ if(p.q) { setQuery(p.q); setSubmitted(true); } }); },[]);
  const q=query.trim().toLowerCase();
  const results=useMemo(()=>q?menuItems.filter(x=>(x.name+" "+x.category+" "+x.description).toLowerCase().includes(q)):[],[q]);
  return <main className="container section search-page">
    <div className="search-page-hero"><div className="eyebrow">Cook Out Search</div><h1>Find it fast.</h1><p className="muted">Search menu items, categories, nutrition topics and published descriptions.</p>
      <form className="search-page-form" onSubmit={e=>{e.preventDefault();setSubmitted(true);window.history.replaceState({}, "", q?"/search/?q="+encodeURIComponent(q):"/search/");}}>
        <span>⌕</span><input autoFocus value={query} onChange={e=>{setQuery(e.target.value);setSubmitted(false)}} placeholder="Try “burger”, “chicken”, “wrap”, “calories”..." aria-label="Search Cook Out" /><button type="submit">SEARCH</button>
      </form>
    </div>
    {submitted&&<div className="search-results"><div className="search-results-head"><h2>{results.length} {results.length===1?"result":"results"} for “{query}”</h2><span>Source-aware index</span></div>
      {results.length?<div className="search-result-grid">{results.map(x=><Link className="search-result-card" href={"/menu/"+x.slug} key={x.slug}><span>{x.category}</span><h3>{x.name}</h3><p>{x.description}</p>{x.nutrition&&<small>{x.nutrition.calories} cal · {x.nutrition.protein_g}g protein · {x.nutrition.sodium_mg}mg sodium</small>}<b>VIEW DETAILS →</b></Link>)}</div>:<div className="search-empty"><h3>No exact match yet.</h3><p>Try a broader term such as burger, chicken, BBQ, wrap, hot dog, shake or nutrition.</p></div>}
    </div>}
  </main>;
}