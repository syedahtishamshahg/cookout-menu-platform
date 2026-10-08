import { redirect } from "next/navigation";
import { getAdminFromRequest } from "@/lib/admin-auth";
import { cookies } from "next/headers";

export const dynamic="force-dynamic";
export const metadata={title:"Admin Control Center"};
export default async function Dashboard(){
 const cookieStore=await cookies();
 const request=new Request("https://cookout.local/admin",{headers:{Cookie:cookieStore.toString()}});
 const admin=await getAdminFromRequest(request);
 if(!admin) redirect("/admin/login");
 const cards=[
  ["Products","Manage names, descriptions, status, nutrition and product media.","/admin/products"],
  ["Articles","Create, edit, publish, unpublish and delete editorial content.","/admin/articles"],
  ["Pages","Manage CMS pages and page-level SEO metadata.","/admin/pages"],
  ["SEO Control","Meta, canonical, robots, schema, Open Graph and indexing controls.","/admin/seo"],
  ["Media Library","Manage image URLs, alt text, sources and verification status.","/admin/media"],
  ["Settings","Site identity, navigation, homepage, social and feature flags.","/admin/settings"],
  ["Reviews","Verification and correction queue for source-aware data.","/admin/reviews"],
  ["Audit Log","Track administrative actions and changes.","/admin/audit"]
 ];
 return <main className="container section admin-dashboard"><div className="eyebrow">CONTROL CENTER · {admin.role.toUpperCase()}</div><div className="admin-dashboard-head"><div><h1>Website Admin</h1><p className="muted">Signed in as {admin.email}. This is the central management layer for Cook Out Index.</p></div><form action="/api/admin/auth" method="post"><input type="hidden" name="action" value="logout"/><button>Log out</button></form></div><div className="admin-card-grid">{cards.map(([title,desc,href])=><a className="admin-module-card" href={href} key={href}><strong>{title}</strong><span>{desc}</span><b>Open →</b></a>)}</div></main>
}