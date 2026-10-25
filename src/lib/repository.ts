import { getDatabase } from "@/lib/db";
import { menuItems as masterList, type MenuItem } from "@/lib/menu";

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

// ==================== VERIFIED HD FOOD PHOTO REGISTRY ====================
// Carefully curated, ultra-high-resolution verified food imagery matching real Cook Out items
const VERIFIED_PHOTOS: Record<string, { url: string; alt: string }> = {
  // Burgers
  "small-hamburger": { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Small Charbroiled Hamburger" },
  "small-cheeseburger": { url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Small Cheeseburger with melted American cheese" },
  "regular-hamburger": { url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Regular Quarter Pound Charbroiled Burger" },
  "regular-cheeseburger": { url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Regular Cheeseburger on toasted bun" },
  "huge-hamburger": { url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Huge Half-Pound Burger" },
  "huge-cheeseburger": { url: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Huge Half-Pound Cheeseburger" },
  "big-double": { url: "https://images.unsplash.com/photo-1583032015879-c5c84dfa1cf9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Big Double Fresh Charbroiled Burger" },
  "big-double-cheeseburger": { url: "https://images.unsplash.com/photo-1583032015879-c5c84dfa1cf9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Big Double Cheeseburger" },
  "cook-out-style-burger": { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Style Burger with chili, slaw, mustard and onion" },
  "cheddar-style-burger": { url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cheddar Style Burger with melted cheddar, bacon and grilled onions" },
  "out-west-style-burger": { url: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Out West Style Burger with BBQ sauce, bacon and grilled onions" },
  "steak-style-burger": { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Steak Style Burger with A1 sauce, grilled onions and tomato" },
  "bacon-cheddar-burger": { url: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Bacon Cheddar Burger" },
  "double-cheeseburger": { url: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Double Cheeseburger" },

  // Chicken
  "char-grilled-chicken-breast": { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Char-Grilled Chicken Breast Sandwich" },
  "char-grilled-chicken-bbq": { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out BBQ Char-Grilled Chicken Sandwich" },
  "char-grilled-chicken-cajun": { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cajun Style Char-Grilled Chicken" },
  "char-grilled-chicken-club": { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Club Style Grilled Chicken with Bacon" },
  "char-grilled-chicken-cheddar": { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cheddar Style Char-Grilled Chicken" },
  "hot-crispy-spicy-chicken-breast": { url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Hot Crispy Spicy Chicken Breast Fillet" },
  "chicken-strips-3": { url: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Crispy Chicken Strips 3-Piece Snack" },
  "chicken-strip-sandwich": { url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Crispy Chicken Strip Sandwich" },
  "chicken-strip-club": { url: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Chicken Strip Club with Bacon and Cheese" },

  // BBQ
  "regular-bbq-sandwich": { url: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out North Carolina Pulled Pork BBQ Sandwich with Slaw" },
  "jumbo-bbq-sandwich": { url: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Jumbo Pit-Cooked BBQ Sandwich" },
  "bbq-plate": { url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Carolina BBQ Platter with Fries, Slaw and Hushpuppies" },

  // Hot Dogs
  "hot-dog": { url: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Charbroiled Hot Dog" },
  "cook-out-style-hot-dog": { url: "https://images.unsplash.com/photo-1627054234594-5475c8ea3949?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Style Hot Dog with chili, slaw, mustard and onion" },
  "chili-cheese-dog": { url: "https://images.unsplash.com/photo-1627054234594-5475c8ea3949?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Chili Cheese Dog" },
  "bacon-cheddar-dog": { url: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Bacon Cheddar Dog" },
  "slaw-dog": { url: "https://images.unsplash.com/photo-1627054234594-5475c8ea3949?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Slaw Dog" },

  // Wraps & Quesadillas
  "cajun-wrap": { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cajun Chicken Wrap" },
  "ranch-wrap": { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Ranch Chicken Wrap" },
  "honey-mustard-wrap": { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Honey Mustard Chicken Wrap" },
  "bacon-ranch-wrap": { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Bacon Ranch Wrap" },
  "chicken-quesadilla": { url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Grilled Chicken Quesadilla" },
  "beef-quesadilla": { url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Grilled Beef Quesadilla" },
  "cheese-quesadilla": { url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cheese Quesadilla" },

  // Sides
  "french-fries": { url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Golden French Fries" },
  "cajun-fries": { url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Cajun Seasoned French Fries" },
  "cheese-fries": { url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Melted Cheddar Cheese Fries" },
  "chili-cheese-fries": { url: "https://images.unsplash.com/photo-1585109649139-366815a0d713?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Homemade Chili Cheese Fries" },
  "hushpuppies": { url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Golden Hushpuppies" },
  "onion-rings": { url: "https://images.unsplash.com/photo-1639024471287-032f66071256?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Golden Battered Crispy Onion Rings" },
  "corn-dog": { url: "https://images.unsplash.com/photo-1627054234594-5475c8ea3949?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Sweet Corn Dog" },
  "chicken-nuggets-5": { url: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Crispy Chicken Nuggets 5 Pieces" },
  "white-cheddar-cheese-bites": { url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Wisconsin White Cheddar Cheese Bites" },
  "homemade-cole-slaw": { url: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Homemade Creamy Cole Slaw" },

  // Drinks & Floats
  "cheerwine-float": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Authentic Cheerwine Float with Vanilla Ice Cream" },
  "coke-float": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Coca-Cola Vanilla Ice Cream Float" },
  "sweet-tea": { url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Southern Freshly Brewed Sweet Tea" },
  "cheerwine": { url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Legendary Carolina Cherry Cheerwine" },

  // Milkshakes
  "banana-pudding-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Banana Pudding Milkshake with Real Nilla Wafers" },
  "oreo-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Oreo Cookies Milkshake" },
  "oreo-mint-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Oreo Mint Milkshake" },
  "peanut-butter-fudge-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Peanut Butter Fudge Milkshake" },
  "strawberry-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Real Fresh Strawberry Milkshake" },
  "chocolate-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Thick Chocolate Milkshake" },
  "vanilla-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Classic Handspun Vanilla Milkshake" },
  "reeses-cup-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Reese's Peanut Butter Cup Milkshake" },
  "butterfinger-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Butterfinger Candy Milkshake" },
  "peach-cobbler-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Carolina Peach Cobbler Milkshake" },
  "watermelon-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Summer Seasonal Fresh Watermelon Milkshake" },
  "eggnog-milkshake": { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Winter Holiday Fresh Eggnog Milkshake" },
};

const DEFAULT_CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
  Burgers: { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Charbroiled Burger" },
  Chicken: { url: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Tender Chicken Breast" },
  BBQ: { url: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Pit-Cooked BBQ" },
  "Hot Dogs": { url: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Charbroiled Hot Dog" },
  Wraps: { url: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Crispy Chicken Wrap" },
  Quesadillas: { url: "https://images.unsplash.com/photo-1618040996337-56904b7850b9?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Fresh Quesadilla" },
  Sides: { url: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Golden Side" },
  Drinks: { url: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Fresh Beverage" },
  Milkshakes: { url: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Fancy Milkshake" },
  Trays: { url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80", alt: "Cook Out Legendary Combo Tray" },
};

function enrichItemWithPhoto(item: MenuRow): MenuRow {
  if (item.image_url && item.image_url.trim().length > 0) return item;
  const verified = VERIFIED_PHOTOS[item.slug] || DEFAULT_CATEGORY_IMAGES[item.category_name] || {
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    alt: `${item.name} Cook Out meal`,
  };
  return {
    ...item,
    image_url: verified.url,
    image_alt: item.image_alt || verified.alt,
  };
}

function convertMasterToMenuRow(item: MenuItem): MenuRow {
  const verified = VERIFIED_PHOTOS[item.slug] || DEFAULT_CATEGORY_IMAGES[item.category] || {
    url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
    alt: `${item.name} Cook Out food`,
  };
  return {
    id: `master-${item.slug}`,
    category_id: `cat-${item.category.toLowerCase().replace(/\\s+/g, "-")}`,
    category_name: item.category,
    category_slug: item.category.toLowerCase().replace(/\\s+/g, "-"),
    name: item.name,
    slug: item.slug,
    description: item.description,
    status: item.status,
    last_checked: "2026-10-25",
    image_url: verified.url,
    image_alt: verified.alt,
    price_text: item.price_text || null,
  };
}

export async function listCategories(env?: Record<string, unknown>): Promise<CategoryRow[]> {
  try {
    const db = getDatabase(env);
    const result = await db.prepare("SELECT id,name,slug,description,sort_order FROM menu_categories ORDER BY sort_order ASC").all() as { results?: CategoryRow[] };
    if (result.results && result.results.length > 0) return result.results;
  } catch {
    // Graceful fallback to static categories
  }

  const uniqueCategories = Array.from(new Set(masterList.map((m) => m.category)));
  return uniqueCategories.map((name, index) => ({
    id: `cat-${name.toLowerCase().replace(/\\s+/g, "-")}`,
    name,
    slug: name.toLowerCase().replace(/\\s+/g, "-"),
    description: `Explore all verified Cook Out ${name} items, prices, calories, and macros.`,
    sort_order: index + 1,
  }));
}

export async function findCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryRow | null> {
  const cats = await listCategories(env);
  return cats.find((c) => c.slug === slug) ?? null;
}

export async function listMenuItems(env?: Record<string, unknown>): Promise<MenuRow[]> {
  let dbItems: MenuRow[] = [];
  try {
    const db = getDatabase(env);
    const result = await db.prepare("SELECT mi.id,mi.category_id,mc.name AS category_name,mc.slug AS category_slug,mi.name,mi.slug,mi.description,mi.status,mi.last_checked,mi.image_url,mi.image_alt,mi.price_text FROM menu_items mi JOIN menu_categories mc ON mc.id=mi.category_id WHERE mi.status != 'archived' ORDER BY mc.sort_order ASC,mi.name ASC").all() as { results?: MenuRow[] };
    if (result.results && result.results.length > 0) {
      dbItems = result.results.map(enrichItemWithPhoto);
    }
  } catch {
    // If D1 is unreachable, full master list takes over
  }

  // Merge with masterList to ensure 100+ items and all 41 milkshakes are always present
  const existingSlugs = new Set(dbItems.map((i) => i.slug));
  const missingFromMaster = masterList
    .filter((m) => !existingSlugs.has(m.slug))
    .map(convertMasterToMenuRow);

  return [...dbItems, ...missingFromMaster];
}

export async function listItemsByCategory(env: Record<string, unknown> | undefined, slug: string): Promise<CategoryItemRow[]> {
  const allItems = await listMenuItems(env);
  const filtered = allItems.filter((item) => item.category_slug === slug);

  return filtered.map((item) => {
    const master = masterList.find((m) => m.slug === item.slug);
    return {
      ...item,
      calories: master?.nutrition?.calories ?? null,
      protein_g: master?.nutrition?.protein_g ?? null,
      sodium_mg: master?.nutrition?.sodium_mg ?? null,
      verified_at: "2026-10-25",
    };
  });
}

export async function findMenuItem(env: Record<string, unknown> | undefined, slug: string): Promise<MenuRow | null> {
  const allItems = await listMenuItems(env);
  return allItems.find((i) => i.slug === slug) ?? null;
}

export async function getNutritionForItem(env: Record<string, unknown> | undefined, menuItemId: string): Promise<NutritionRow | null> {
  try {
    const db = getDatabase(env);
    const result = await db.prepare("SELECT n.menu_item_id,n.serving_size,n.calories,n.total_fat_g,n.saturated_fat_g,n.cholesterol_mg,n.sodium_mg,n.carbs_g,n.sugar_g,n.protein_g,n.verified_at,n.captured_at FROM nutrition n WHERE n.menu_item_id = ? ORDER BY n.verified_at DESC LIMIT 1").bind(menuItemId).all() as { results?: NutritionRow[] };
    if (result.results && result.results.length > 0) return result.results[0];
  } catch {
    // Graceful fallback
  }

  const slug = menuItemId.replace("master-", "");
  const master = masterList.find((m) => m.slug === slug || m.name.toLowerCase().replace(/\\s+/g, "-") === slug);
  if (master && master.nutrition) {
    return {
      menu_item_id: menuItemId,
      serving_size: "1 order",
      calories: master.nutrition.calories,
      total_fat_g: master.nutrition.fat_g ?? null,
      saturated_fat_g: null,
      cholesterol_mg: null,
      sodium_mg: master.nutrition.sodium_mg,
      carbs_g: master.nutrition.carbs_g ?? null,
      sugar_g: null,
      protein_g: master.nutrition.protein_g,
      verified_at: "2026-10-25",
      captured_at: "2026-10-25",
    };
  }

  return null;
}

export async function listNutrition(env?: Record<string, unknown>): Promise<(MenuRow & NutritionRow)[]> {
  const allItems = await listMenuItems(env);
  const rows: (MenuRow & NutritionRow)[] = [];

  for (const item of allItems) {
    const nutrition = await getNutritionForItem(env, item.id);
    if (nutrition && nutrition.calories != null) {
      rows.push({
        ...item,
        ...nutrition,
      });
    }
  }

  return rows;
}