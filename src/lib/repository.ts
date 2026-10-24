import { getDatabase } from "@/lib/db";

export type CategoryRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
};

export type MenuRow = {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  name: string;
  slug: string;
  description: string | null;
  status: string;
  last_checked: string | null;
  image_url: string | null;
  image_alt: string | null;
  price_text: string | null;
};

export type NutritionRow = {
  menu_item_id: string;
  serving_size: string | null;
  calories: number | null;
  total_fat_g: number | null;
  saturated_fat_g: number | null;
  cholesterol_mg: number | null;
  sodium_mg: number | null;
  carbs_g: number | null;
  sugar_g: number | null;
  protein_g: number | null;
  verified_at: string | null;
  captured_at: string | null;
};

export type CategoryItemRow = MenuRow & {
  calories: number | null;
  protein_g: number | null;
  sodium_mg: number | null;
  verified_at: string | null;
};

const MENU_SELECT = "SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id";
const NUTRITION_SELECT = "n.menu_item_id,n.serving_size,n.calories,n.total_fat_g,n.saturated_fat_g,n.cholesterol_mg,n.sodium_mg,n.carbs_g,n.sugar_g,n.protein_g,n.verified_at,n.captured_at";

export async function listCategories(env?: Record<string, unknown>): Promise<CategoryRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories ORDER BY sort_order ASC").all() as { results?: CategoryRow[] };
  return result.results ?? [];
}

export async function findCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories WHERE slug = ?").bind(slug).all() as { results?: CategoryRow[] };
  return result.results?.[0] ?? null;
}

export async function listMenuItems(env?: Record<string, unknown>): Promise<MenuRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare(MENU_SELECT + " WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as { results?: MenuRow[] };
  return result.results ?? [];
}

export async function listItemsByCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryItemRow[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text,n.calories,n.protein_g,n.sodium_mg,n.verified_at FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id LEFT JOIN nutrition n ON n.id = (SELECT id FROM nutrition WHERE menu_item_id = mi.id ORDER BY verified_at DESC LIMIT 1) WHERE mc.slug = ? AND mi.status != 'archived' ORDER BY mi.name ASC").bind(slug).all() as { results?: CategoryItemRow[] };
  return result.results ?? [];
}

export async function findMenuItem(env: Record<string, unknown> | undefined, slug: string): Promise<MenuRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare(MENU_SELECT + " WHERE mi.slug = ? AND mi.status != 'archived'").bind(slug).all() as { results?: MenuRow[] };
  return result.results?.[0] ?? null;
}

export async function getNutritionForItem(env: Record<string, unknown> | undefined, menuItemId: string): Promise<NutritionRow | null> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT " + NUTRITION_SELECT + " FROM nutrition n WHERE n.menu_item_id = ? ORDER BY n.verified_at DESC LIMIT 1").bind(menuItemId).all() as { results?: NutritionRow[] };
  return result.results?.[0] ?? null;
}

export async function listNutrition(env?: Record<string, unknown>): Promise<(MenuRow & NutritionRow)[]> {
  const db = getDatabase(env);
  const result = await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text," + NUTRITION_SELECT + " FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id JOIN nutrition n ON n.menu_item_id=mi.id WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as { results?: ((MenuRow & NutritionRow)[]) };
  return result.results ?? [];
}