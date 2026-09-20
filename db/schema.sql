-- Cook Out Menu Platform — initial D1-compatible schema
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS menu_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS menu_items (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL REFERENCES menu_categories(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK(status IN ('active','seasonal','archived','needs_review')),
  official_reference TEXT,
  first_seen TEXT,
  last_checked TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS nutrition (
  id TEXT PRIMARY KEY,
  menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
  serving_size TEXT,
  calories REAL,
  total_fat_g REAL,
  saturated_fat_g REAL,
  trans_fat_g REAL,
  cholesterol_mg REAL,
  sodium_mg REAL,
  carbs_g REAL,
  fiber_g REAL,
  sugar_g REAL,
  protein_g REAL,
  source_id TEXT,
  captured_at TEXT,
  verified_at TEXT
);

CREATE TABLE IF NOT EXISTS price_sources (
  id TEXT PRIMARY KEY,
  source_type TEXT NOT NULL CHECK(source_type IN ('official','menu_board','receipt','user_submitted','secondary','editorial')),
  source_name TEXT NOT NULL,
  url TEXT,
  location TEXT,
  captured_at TEXT,
  reliability_level TEXT NOT NULL DEFAULT 'medium' CHECK(reliability_level IN ('high','medium','low')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS prices (
  id TEXT PRIMARY KEY,
  menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
  location_id TEXT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  source_id TEXT NOT NULL REFERENCES price_sources(id),
  captured_at TEXT NOT NULL,
  verified_at TEXT,
  confidence TEXT NOT NULL DEFAULT 'medium' CHECK(confidence IN ('high','medium','low')),
  status TEXT NOT NULL DEFAULT 'unverified' CHECK(status IN ('verified','unverified','stale','rejected')),
  notes TEXT
);

CREATE TABLE IF NOT EXISTS price_history (
  id TEXT PRIMARY KEY,
  menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
  location_id TEXT,
  amount REAL NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  source_id TEXT REFERENCES price_sources(id),
  effective_at TEXT NOT NULL,
  recorded_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS locations (
  id TEXT PRIMARY KEY,
  state_code TEXT,
  state_name TEXT,
  city TEXT,
  name TEXT,
  address TEXT,
  phone TEXT,
  latitude REAL,
  longitude REAL,
  official_url TEXT,
  source_id TEXT REFERENCES price_sources(id),
  last_checked TEXT,
  status TEXT NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS location_hours (
  id TEXT PRIMARY KEY,
  location_id TEXT NOT NULL REFERENCES locations(id),
  day_of_week INTEGER NOT NULL CHECK(day_of_week BETWEEN 0 AND 6),
  opens_at TEXT,
  closes_at TEXT,
  notes TEXT,
  source_id TEXT REFERENCES price_sources(id),
  last_checked TEXT
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_prices_item_location ON prices(menu_item_id, location_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_item ON nutrition(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_locations_state_city ON locations(state_code, city);
