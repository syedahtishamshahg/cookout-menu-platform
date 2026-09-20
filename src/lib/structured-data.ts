import {absoluteUrl,SITE_NAME} from "@/lib/seo";
export function organizationJsonLd(){return {"@context":"https://schema.org","@type":"Organization","name":SITE_NAME,"url":absoluteUrl("/")};}
export function breadcrumbJsonLd(items:{name:string;path:string}[]){return {"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":items.map((x,i)=>({"@type":"ListItem",position:i+1,name:x.name,item:absoluteUrl(x.path)}))};}
