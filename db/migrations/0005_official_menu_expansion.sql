-- 0005: Expand source-backed core menu records from Cook Out's official nutrition document.
-- Source: https://cookout.com/wp-content/uploads/Cook-Out-Nutrition.pdf
-- Prices and locations are intentionally not seeded here because they are
-- location-dependent and require separate verification.

INSERT OR IGNORE INTO menu_categories (id,name,slug,description,sort_order) VALUES
('cat-quesadillas','Quesadillas','quesadillas','Cook Out quesadilla options documented in the official menu/nutrition material.',60),
('cat-sides','Sides','sides','Side items and add-ons. Individual nutrition records are added only when verified.',70),
('cat-drinks','Drinks','drinks','Beverages and drink options.',80),
('cat-desserts','Desserts','desserts','Dessert items.',90),
('cat-milkshakes','Milkshakes','milkshakes','Cook Out fresh shake options.',100),
('cat-trays','Trays','trays','Cook Out tray and meal combinations.',110);

INSERT OR IGNORE INTO price_sources (id,source_type,source_name,url,captured_at,reliability_level,notes) VALUES
('src-official-menu-2026','official','Cook Out official menu','https://cookout.com/menu/','2026-09-25','high','Primary public menu page. Use for menu/category verification; prices are not assumed from this source.'),
('src-official-shakes-2026','official','Cook Out official shakes page','https://cookout.com/shakes/','2026-09-25','high','Primary public shakes page. Detailed flavor data should be added only after verification.'),
('src-official-locations-2026','official','Cook Out official locations page','https://cookout.com/locations/','2026-09-25','high','Primary location directory. Location records should be imported only after verifying the source data.');

INSERT OR IGNORE INTO menu_items (id,category_id,name,slug,description,status,last_checked) VALUES
('item-big-double','cat-burgers','Big Double','big-double','Big Double hamburger documented in the official Cook Out nutrition document.','active','2026-09-25'),
('item-cookout-style-hot-dog','cat-hot-dogs','Cook Out Style Hot Dog','cook-out-style-hot-dog','Cook Out Style Hot Dog documented in the official nutrition document.','active','2026-09-25'),
('item-mexi-hot-dog','cat-hot-dogs','Mexi Hot Dog','mexi-hot-dog','Mexi Hot Dog documented in the official nutrition document.','active','2026-09-25'),
('item-bacon-cheddar-hot-dog','cat-hot-dogs','Bacon Cheddar Hot Dog','bacon-cheddar-hot-dog','Bacon Cheddar Hot Dog documented in the official nutrition document.','active','2026-09-25'),
('item-bbq-plate','cat-bbq','BBQ Plate','bbq-plate','BBQ Plate documented in the official nutrition document.','active','2026-09-25'),
('item-chicken-strip-sandwich','cat-chicken','Chicken Strip Sandwich','chicken-strip-sandwich','Chicken Strip Sandwich documented in the official nutrition document.','active','2026-09-25'),
('item-chicken-strip-club','cat-chicken','Chicken Strip Club','chicken-strip-club','Chicken Strip Club documented in the official nutrition document.','active','2026-09-25');

INSERT OR IGNORE INTO nutrition (id,menu_item_id,serving_size,calories,total_fat_g,saturated_fat_g,trans_fat_g,cholesterol_mg,sodium_mg,carbs_g,fiber_g,sugar_g,protein_g,source_id,captured_at,verified_at) VALUES
('nut-big-double','item-big-double','6.5 oz (184.5 g)',311,13,4,1,60,126,27,0,4,20,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-cookout-style-hot-dog','item-cookout-style-hot-dog','6.2 oz (176 g)',383,20,6,0,34,1118,29,1,7,11,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-mexi-hot-dog','item-mexi-hot-dog','7.3 oz (207.8 g)',385,19,6,0,36,1352,29,1,5,12,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-bacon-cheddar-hot-dog','item-bacon-cheddar-hot-dog','4.62 oz (131 g)',523,29,9,0,49,1494,47,0,6,19,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-bbq-plate','item-bbq-plate','17.3 oz (491.6 g)',976,43,10,0,96,2445,105,10,21,35,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-chicken-strip-sandwich','item-chicken-strip-sandwich','11.6 oz (330 g)',674,32,4,0,45,1804,71,2,7,28,'src-official-nutrition-2026','2026-09-25','2026-09-25'),
('nut-chicken-strip-club','item-chicken-strip-club','11.6 oz (330 g)',846,48,11,0,86,2539,70,2,5,39,'src-official-nutrition-2026','2026-09-25','2026-09-25');
