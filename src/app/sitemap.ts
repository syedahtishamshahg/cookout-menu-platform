import type { MetadataRoute } from "next";
import { listMenuItems } from "@/lib/repository";
const SITE="https://cookout-menu-platform.syedahtishamshahg.workers.dev";

export const dynamic="force-dynamic";

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const staticPaths=[
    "/","/menu/","/menu/prices/","/menu/trays/","/menu/burgers/","/menu/chicken/","/menu/bbq/","/menu/hot-dogs/","/menu/sides/","/menu/quesadillas/","/menu/wraps/","/menu/milkshakes/",
    "/nutrition/","/nutrition/calories/","/nutrition/protein/","/nutrition/sodium/","/locations/","/hours/","/delivery/","/ordering/","/catering/","/breakfast/",
    "/tools/","/tools/tray-builder/","/tools/shake-mixer/","/tools/calorie-calculator/","/tools/price-calculator/","/secret-menu/",
    "/guides/","/comparisons/","/about/","/methodology/","/editorial-policy/","/sources/","/corrections/","/contact/","/privacy/","/terms/","/disclaimer/","/ai/"
  ];
  const items=await listMenuItems();
  const itemPaths=items.map(item=>"/menu/"+item.slug);
  return [...staticPaths,...itemPaths].map(path=>({url:SITE+path,lastModified:new Date()}));
}