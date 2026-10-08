import { NextResponse } from "next/server";
import { audit, getAdminFromRequest } from "@/lib/admin-auth";
import { getDatabase } from "@/lib/db";

export async function GET(request:Request){
 const admin=await getAdminFromRequest(request); if(!admin) return NextResponse.json({error:"Unauthorized"},{status:401});
 const db=getDatabase();
 const result=await db.prepare("SELECT mi.id,mi.name,mi.slug,mi.description,mi.status,mi.price_text,mi.image_url,mi.image_alt,mi.featured,mc.name AS category_name FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id ORDER BY mc.sort_order,mi.name").all() as {results?:unknown[]};
 return NextResponse.json({items:result.results??[]});
}
export async function PUT(request:Request){
 const admin=await getAdminFromRequest(request); if(!admin) return NextResponse.json({error:"Unauthorized"},{status:401});
 const b=await request.json() as {id?:string;name?:string;description?:string;status?:string;price_text?:string;image_url?:string;image_alt?:string;featured?:boolean};
 if(!b.id) return NextResponse.json({error:"Product id required"},{status:400});
 const db=getDatabase();
 await db.prepare("UPDATE menu_items SET name=?,description=?,status=?,price_text=?,image_url=?,image_alt=?,featured=? WHERE id=?")
 .bind(String(b.name||""),b.description??null,b.status==="inactive"?"inactive":"active",b.price_text??null,b.image_url??null,b.image_alt??null,b.featured?1:0,b.id).all();
 await audit(admin.id,"update","menu_item",b.id,{image:b.image_url||null});
 return NextResponse.json({ok:true});
}