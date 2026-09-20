-- Source-backed starter records. Review the source before treating these as production-verified.
INSERT OR IGNORE INTO price_sources (id,source_type,source_name,url,captured_at,reliability_level,notes)
VALUES ('src-official-nutrition','official','Cook Out Nutrition Reference','https://cookout.com/',CURRENT_TIMESTAMP,'high','Use the current official nutrition material as the authoritative source; re-check URL/document before production import.');

INSERT OR IGNORE INTO menu_items (id,category_id,name,slug,description,status,last_checked)
VALUES
('item-small-hamburger','cat-burgers','Small Hamburger','small-hamburger','Small hamburger.','active','2026-09-21'),
('item-regular-hamburger','cat-burgers','Regular Hamburger','regular-hamburger','Regular hamburger.','active','2026-09-21'),
('item-huge-hamburger','cat-burgers','Huge Hamburger','huge-hamburger','Huge hamburger.','active','2026-09-21'),
('item-big-double','cat-burgers','Big Double','big-double','Big Double hamburger.','active','2026-09-21'),
('item-char-grilled-chicken','cat-chicken','Char-Grilled Chicken Breast','char-grilled-chicken-breast','Char-grilled chicken breast.','active','2026-09-21'),
('item-hot-crispy-chicken','cat-chicken','Hot Crispy Spicy Chicken Breast','hot-crispy-spicy-chicken-breast','Hot crispy spicy chicken breast.','active','2026-09-21'),
('item-reg-bbq','cat-bbq','Reg BBQ Sandwich','regular-bbq-sandwich','Regular BBQ sandwich.','active','2026-09-21'),
('item-hot-dog','cat-hot-dogs','Hot Dog','hot-dog','Hot dog.','active','2026-09-21'),
('item-cajun-wrap','cat-wraps','Cajun Wrap','cajun-wrap','Cajun wrap.','active','2026-09-21'),
('item-ranch-wrap','cat-wraps','Ranch Wrap','ranch-wrap','Ranch wrap.','active','2026-09-21'),
('item-honey-mustard-wrap','cat-wraps','Honey Mustard Wrap','honey-mustard-wrap','Honey mustard wrap.','active','2026-09-21'),
('item-chicken-strips-3','cat-chicken','Chicken Strips (3)','chicken-strips-3','Three chicken strips.','active','2026-09-21');

INSERT OR IGNORE INTO nutrition (id,menu_item_id,serving_size,calories,total_fat_g,saturated_fat_g,trans_fat_g,cholesterol_mg,sodium_mg,carbs_g,fiber_g,sugar_g,protein_g,source_id,captured_at,verified_at)
VALUES
('nut-small-hamburger','item-small-hamburger','3.2 oz (90.4 g)',245,8,3,1,37,309,27,0,4,14,'src-official-nutrition','2026-09-21',NULL),
('nut-regular-hamburger','item-regular-hamburger','4.4 oz (125 g)',328,14,5,1,66,340,27,0,4,22,'src-official-nutrition','2026-09-21',NULL),
('nut-huge-hamburger','item-huge-hamburger','7.2 oz (202.6 g)',516,26,10,2,132,410,27,0,4,40,'src-official-nutrition','2026-09-21',NULL),
('nut-big-double','item-big-double','6.5 oz (184.5 g)',311,13,4,1,60,126,27,0,4,20,'src-official-nutrition','2026-09-21',NULL),
('nut-char-grilled-chicken','item-char-grilled-chicken','6.67 oz (189.2 g)',377,17,3,0,59,575,29,0,5,25,'src-official-nutrition','2026-09-21',NULL),
('nut-hot-crispy-chicken','item-hot-crispy-chicken','5.61 oz (159 g)',446,18,3,0,39,1158,45,2,5,21,'src-official-nutrition','2026-09-21',NULL),
('nut-reg-bbq','item-reg-bbq','8.8 oz (249.5 g)',368,12,3,0,66,1103,35,1,9,29,'src-official-nutrition','2026-09-21',NULL),
('nut-hot-dog','item-hot-dog','2.9 oz (81 g)',260,15,5,0,25,600,22,0,3,8,'src-official-nutrition','2026-09-21',NULL),
('nut-cajun-wrap','item-cajun-wrap','6 oz (170 g)',501,27,11,0,54,1285,44,2,0,25,'src-official-nutrition','2026-09-21',NULL),
('nut-ranch-wrap','item-ranch-wrap','6.1 oz (174.2 g)',522,29,12,0,56,1273,44,2,0,25,'src-official-nutrition','2026-09-21',NULL),
('nut-honey-mustard-wrap','item-honey-mustard-wrap','6.2 oz (175.2 g)',517,28,11,0,55,1279,46,2,2,25,'src-official-nutrition','2026-09-21',NULL),
('nut-chicken-strips-3','item-chicken-strips-3','8.25 oz (234 g)',660,33,5,0,60,2130,60,3,0,36,'src-official-nutrition','2026-09-21',NULL);
