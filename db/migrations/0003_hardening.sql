CREATE INDEX IF NOT EXISTS idx_menu_items_slug ON menu_items(slug);
CREATE INDEX IF NOT EXISTS idx_sources_type ON price_sources(source_type);
CREATE INDEX IF NOT EXISTS idx_prices_verified ON prices(status,verified_at);
CREATE INDEX IF NOT EXISTS idx_locations_status ON locations(status);