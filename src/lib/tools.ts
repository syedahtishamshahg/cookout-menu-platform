import {menuItems} from "@/lib/menu";
export const trayMains=menuItems.filter(x=>["Burgers","Chicken","BBQ","Hot Dogs","Wraps"].includes(x.category));
export const traySides=[{name:"Fries",slug:"fries"},{name:"Cajun Fries",slug:"cajun-fries"},{name:"Onion Rings",slug:"onion-rings"},{name:"Hushpuppies",slug:"hushpuppies"}];
export const trayDrinks=[{name:"Soft Drink",slug:"soft-drink"},{name:"Tea",slug:"tea"},{name:"Cheerwine",slug:"cheerwine"}];
export const shakeFlavors=["Vanilla","Chocolate","Strawberry","Fresh Banana","Peach","Oreo","Reese's Cup","Cappuccino","Mocha","Walnut","Pineapple"];
export function getItem(slug:string){return menuItems.find(x=>x.slug===slug);}
