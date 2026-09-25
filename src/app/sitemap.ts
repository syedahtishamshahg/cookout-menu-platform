import type { MetadataRoute } from "next";
const SITE="https://cookout-menu-platform.syedahtishamshahg.workers.dev";
export default function sitemap():MetadataRoute.Sitemap{
  const paths=[
    "/","/menu/","/menu/prices/","/menu/trays/","/menu/burgers/","/menu/chicken/","/menu/bbq/","/menu/hot-dogs/","/menu/sides/","/menu/quesadillas/","/menu/wraps/","/menu/milkshakes/",
    "/nutrition/","/nutrition/calories/","/nutrition/protein/","/nutrition/sodium/","/locations/","/hours/","/delivery/","/ordering/","/catering/","/breakfast/",
    "/tools/","/tools/tray-builder/","/tools/shake-mixer/","/tools/calorie-calculator/","/tools/price-calculator/","/secret-menu/",
    "/guides/","/comparisons/","/about/","/methodology/","/editorial-policy/","/sources/","/corrections/","/contact/","/privacy/","/terms/","/disclaimer/","/ai/"
  ];
  return paths.map(path=>({url:SITE+path,lastModified:new Date()}));
}