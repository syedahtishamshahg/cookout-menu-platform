export const SITE_URL="https://cookout-menu-platform.pages.dev";
export const SITE_NAME="Cook Out Menu";
export function absoluteUrl(path:string){return new URL(path,SITE_URL).toString();}
export function webPageJsonLd(name:string,path:string,description:string){return {"@context":"https://schema.org","@type":"WebPage",name,url:absoluteUrl(path),description};}
