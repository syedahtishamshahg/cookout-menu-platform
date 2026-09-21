import {getDatabase,type D1DatabaseLike} from "@/lib/db";

export type CategoryRow={id:string;name:string;slug:string;description:string|null;sort_order:number};
export type MenuRow={id:string;category_id:string;category_name:string;name:string;slug:string;description:string|null;status:string;last_checked:string|null};
export type NutritionRow={menu_item_id:string;calories:number|null;protein_g:number|null;sodium_mg:number|null;verified_at:string|null};

export async function listCategories(env?:Record<string,unknown>):Promise<CategoryRow[]>{
  const db=getDatabase(env);
  const result=await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories ORDER BY sort_order ASC").all() as {results?:CategoryRow[]};
  return result.results??[];
}

export async function listMenuItems(env?:Record<string,unknown>):Promise<MenuRow[]>{
  const db=getDatabase(env);
  const result=await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mi.name,mi.slug,mi.description,mi.status,mi.last_checked FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as {results?:MenuRow[]};
  return result.results??[];
}

export async function findMenuItem(env:Record<string,unknown>|undefined,slug:string):Promise<MenuRow|null>{
  const db=getDatabase(env);
  const result=await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mi.name,mi.slug,mi.description,mi.status,mi.last_checked FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id WHERE mi.slug = ? AND mi.status != 'archived'").bind(slug).all() as {results?:MenuRow[]};
  return result.results?.[0]??null;
}

export async function getNutritionForItem(env:Record<string,unknown>|undefined,menuItemId:string):Promise<NutritionRow|null>{
  const db=getDatabase(env);
  const result=await db.prepare("SELECT menu_item_id,calories,protein_g,sodium_mg,verified_at FROM nutrition WHERE menu_item_id = ? ORDER BY verified_at DESC LIMIT 1").bind(menuItemId).all() as {results?:NutritionRow[]};
  return result.results?.[0]??null;
}

export async function listNutrition(env?:Record<string,unknown>):Promise<(MenuRow & NutritionRow)[]>{
  const db=getDatabase(env);
  const result=await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,n.menu_item_id,n.calories,n.protein_g,n.sodium_mg,n.verified_at FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id JOIN nutrition n ON n.menu_item_id=mi.id WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as {results?:((MenuRow & NutritionRow)[])};
  return result.results??[];
}