import {menuItems} from "@/lib/menu";
export function searchMenu(query:string){const q=query.trim().toLowerCase();if(!q)return[];return menuItems.filter(x=>[x.name,x.slug,x.category,x.description].some(v=>String(v??"").toLowerCase().includes(q))).slice(0,20);}
