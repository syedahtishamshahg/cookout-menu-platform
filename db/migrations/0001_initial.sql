CREATE TABLE IF NOT EXISTS menu_categories (
 id TEXT PRIMARY KEY,
 name TEXT NOT NULL,
 slug TEXT NOT NULL UNIQUE,
 description TEXT,
 sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS menu_items (
 id TEXT PRIMARY KEY,
 category_id TEXT NOT NULL REFERENCES menu_categories(id),
 name TEXT NOT NULL,
 slug TEXT NOT NULL UNIQUE,
 description TEXT,
 status TEXT NOT NULL DEFAULT 'active',
 last_checked TEXT
);
CREATE TABLE IF NOT EXISTS price_sources (
 id TEXT PRIMARY KEY,
 source_type TEXT NOT NULL,
 source_name TEXT NOT NULL,
 url TEXT,
 captured_at TEXT NOT NULL,
 reliability_level TEXT NOT NULL,
 notes TEXT
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
 source_id TEXT REFERENCES price_sources(id),
 captured_at TEXT NOT NULL,
 verified_at TEXT
);
CREATE TABLE IF NOT EXISTS locations (
 id TEXT PRIMARY KEY,
 state_name TEXT NOT NULL,
 state_code TEXT,
 city TEXT NOT NULL,
 address TEXT NOT NULL,
 phone TEXT,
 status TEXT NOT NULL DEFAULT 'pending',
 source_id TEXT REFERENCES price_sources(id),
 last_checked TEXT
);
CREATE TABLE IF NOT EXISTS prices (
 id TEXT PRIMARY KEY,
 menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
 location_id TEXT NOT NULL REFERENCES locations(id),
 amount REAL NOT NULL,
 currency TEXT NOT NULL DEFAULT 'USD',
 source_id TEXT REFERENCES price_sources(id),
 captured_at TEXT NOT NULL,
 verified_at TEXT,
 confidence TEXT NOT NULL DEFAULT 'low',
 status TEXT NOT NULL DEFAULT 'unverified',
 notes TEXT
);
CREATE TABLE IF NOT EXISTS price_history (
 id TEXT PRIMARY KEY,
 menu_item_id TEXT NOT NULL REFERENCES menu_items(id),
 location_id TEXT NOT NULL REFERENCES locations(id),
 amount REAL NOT NULL,
 currency TEXT NOT NULL DEFAULT 'USD',
 effective_at TEXT NOT NULL,
 source_id TEXT REFERENCES price_sources(id),
 status TEXT NOT NULL DEFAULT 'unverified'
);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_nutrition_item ON nutrition(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_locations_state_city ON locations(state_name,city);
CREATE INDEX IF NOT EXISTS idx_prices_item_location ON prices(menu_item_id,location_id);
CREATE INDEX IF NOT EXISTS idx_prices_status ON prices(status);
CREATE INDEX IF NOT EXISTS idx_price_history_lookup ON price_history(menu_item_id,location_id,effective_at);