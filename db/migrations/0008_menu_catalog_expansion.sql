-- 0008: Expanded menu catalog and transparent third-party price estimates.
-- Official menu is the authority for item/category presence:
-- https://cookout.com/menu/
-- Official nutrition source:
-- https://cookout.com/wp-content/uploads/Cook-Out-Nutrition.pdf
-- Third-party price references are estimates only; Cook Out does not publish a
-- single nationwide price list. Do not present these ranges as official prices.
INSERT OR IGNORE INTO price_sources (id,source_type,source_name,url,captured_at,reliability_level,notes) VALUES
('src-price-guide-menupricesusa-2026','third-party','MenuPricesUSA Cookout price guide','https://menupricesusa.com/cookout-menu/','2026-10-21','medium','Independent guide based on selected store menu boards; prices vary by location and are not official national prices.'),
('src-price-guide-cookoutmenus-2026','third-party','TheCookOutMenus price guide','https://thecookoutmenus.us/','2026-10-21','medium','Independent guide; prices can vary by location and require local confirmation.');

INSERT OR IGNORE INTO menu_items (id,category_id,name,slug,description,status,last_checked,price_text,featured) VALUES
('item-small-cheeseburger','cat-burgers','Small Cheeseburger','small-cheeseburger','Small char-grilled hamburger with cheese. Price estimates from independent menu guides; confirm with your local restaurant.','active','2026-10-21','Approx. $2.29–$3.39; location varies',0),
('item-regular-cheeseburger','cat-burgers','Regular Cheeseburger','regular-cheeseburger','Regular char-grilled hamburger with cheese. Price estimates from independent menu guides; confirm locally.','active','2026-10-21','Approx. $3.29–$4.39; location varies',1),
('item-cookout-style-burger','cat-burgers','Cook Out Style Burger','cook-out-style-burger','Burger with Cook Out style toppings; ingredients and availability should be confirmed at the restaurant.','active','2026-10-21','Approx. $2.99–$4.39; location varies',1),
('item-everything-style-burger','cat-burgers','Everything Style Burger','everything-style-burger','Burger with classic condiments and toppings; confirm exact build locally.','active','2026-10-21',NULL,0),
('item-cheddar-style-burger','cat-burgers','Cheddar Style Burger','cheddar-style-burger','Burger with cheddar cheese, bacon and grilled onions; confirm current availability and price.','active','2026-10-21',NULL,0),
('item-steak-style-burger','cat-burgers','Steak Style Burger','steak-style-burger','Burger with steak-style toppings; confirm current availability and price.','active','2026-10-21',NULL,0),
('item-out-west-style-burger','cat-burgers','Out West Style Burger','out-west-style-burger','Burger style listed in independent menu references; verify availability with your location.','active','2026-10-21',NULL,0),
('item-bbq-sandwich','cat-bbq','BBQ Sandwich','bbq-sandwich','Barbecue sandwich; ingredient details and price may vary by store.','active','2026-10-21','Approx. $3.79–$4.99; location varies',1),
('item-bbq-chicken','cat-bbq','BBQ Chicken','bbq-chicken','Barbecue-style chicken option; confirm current menu availability locally.','active','2026-10-21',NULL,0),
('item-chicken-quesadilla','cat-quesadillas','Chicken Quesadilla','chicken-quesadilla','Chicken quesadilla listed in Cook Out menu references.','active','2026-10-21','Approx. $1.99–$3.49 à la carte; location varies',0),
('item-beef-quesadilla','cat-quesadillas','Beef Quesadilla','beef-quesadilla','Quesadilla option; confirm current fillings and availability at your location.','active','2026-10-21',NULL,0),
('item-cheese-quesadilla','cat-quesadillas','Cheese Quesadilla','cheese-quesadilla','Cheese quesadilla; confirm current availability and price locally.','active','2026-10-21',NULL,0),
('item-chicken-nuggets','cat-chicken','Chicken Nuggets','chicken-nuggets','Chicken nuggets; serving size and sauces vary by order.','active','2026-10-21',NULL,0),
('item-chicken-wrap-cajun-ranch','cat-wraps','Cajun Ranch Wrap','cajun-ranch-wrap','Cajun ranch chicken wrap.','active','2026-10-21',NULL,0),
('item-spicy-chicken-sandwich','cat-chicken','Spicy Chicken Sandwich','spicy-chicken-sandwich','Spicy chicken sandwich; confirm exact preparation and availability locally.','active','2026-10-21','Approx. $3.39–$4.99; location varies',0),
('item-grilled-chicken-sandwich','cat-chicken','Grilled Chicken Sandwich','grilled-chicken-sandwich','Grilled chicken sandwich; exact style may vary by menu offering.','active','2026-10-21',NULL,0),
('item-french-fries','cat-sides','French Fries','french-fries','French fries served as a side or tray selection.','active','2026-10-21','Approx. $2.39–$2.99; location varies',1),
('item-cajun-fries','cat-sides','Cajun Fries','cajun-fries','French fries seasoned with Cajun-style seasoning.','active','2026-10-21','Approx. $2.39–$2.99; location varies',0),
('item-onion-rings','cat-sides','Onion Rings','onion-rings','Battered onion rings; portion and price vary by location.','active','2026-10-21','Approx. $2.49–$2.99; location varies',0),
('item-hushpuppies','cat-sides','Hushpuppies','hushpuppies','Southern-style cornmeal hushpuppies.','active','2026-10-21','Approx. $2.49–$2.99; location varies',0),
('item-cheese-fries','cat-sides','Cheese Fries','cheese-fries','Fries topped with cheese; confirm toppings and current price locally.','active','2026-10-21',NULL,0),
('item-jalapeno-cheese-fries','cat-sides','Jalapeño Cheese Fries','jalapeno-cheese-fries','Fries with cheese and jalapeños; confirm current availability locally.','active','2026-10-21',NULL,0),
('item-corn-dog','cat-sides','Corn Dog','corn-dog','Corn dog option listed in independent menu references; confirm availability locally.','active','2026-10-21',NULL,0),
('item-cheerwine-float','cat-drinks','Cheerwine Float','cheerwine-float','Cheerwine float; availability and pricing may vary by location.','active','2026-10-21',NULL,0),
('item-fountain-drink','cat-drinks','Fountain Drink','fountain-drink','Fountain beverage; flavor and size selection vary by restaurant.','active','2026-10-21','Approx. $2.19–$2.59; location varies',0),
('item-sweet-tea','cat-drinks','Sweet Tea','sweet-tea','Sweet tea beverage; size and availability vary by restaurant.','active','2026-10-21',NULL,0),
('item-unsweet-tea','cat-drinks','Unsweet Tea','unsweet-tea','Unsweet tea beverage; size and availability vary by restaurant.','active','2026-10-21',NULL,0),
('item-vanilla-shake','cat-milkshakes','Vanilla Milkshake','vanilla-milkshake','Vanilla milkshake. Flavor availability, size and price should be checked locally.','active','2026-10-21','Approx. $3.59–$3.99; location varies',1),
('item-chocolate-shake','cat-milkshakes','Chocolate Milkshake','chocolate-milkshake','Chocolate milkshake. Flavor availability, size and price should be checked locally.','active','2026-10-21','Approx. $3.59–$3.99; location varies',0),
('item-strawberry-shake','cat-milkshakes','Strawberry Milkshake','strawberry-milkshake','Strawberry milkshake. Flavor availability, size and price should be checked locally.','active','2026-10-21','Approx. $3.59–$3.99; location varies',0),
('item-oreo-shake','cat-milkshakes','Oreo Milkshake','oreo-milkshake','Oreo-style cookie milkshake listed in independent menu references; verify flavor naming locally.','active','2026-10-21','Approx. $3.99; location varies',1),
('item-banana-pudding-shake','cat-milkshakes','Banana Pudding Milkshake','banana-pudding-milkshake','Banana pudding flavored milkshake; confirm current seasonal availability.','active','2026-10-21','Approx. $3.99; location varies',0),
('item-peach-shake','cat-milkshakes','Peach Milkshake','peach-milkshake','Peach milkshake flavor; seasonal availability may vary.','active','2026-10-21',NULL,0),
('item-watermelon-shake','cat-milkshakes','Watermelon Milkshake','watermelon-milkshake','Watermelon milkshake flavor; seasonal availability may vary.','active','2026-10-21',NULL,0),
('item-coconut-cream-pie-shake','cat-milkshakes','Coconut Cream Pie Milkshake','coconut-cream-pie-milkshake','Coconut cream pie flavored milkshake listed in independent flavor guides; verify current availability.','active','2026-10-21',NULL,0),
('item-cookies-cream-shake','cat-milkshakes','Cookies and Cream Milkshake','cookies-and-cream-milkshake','Cookies and cream milkshake; flavor naming may differ by location.','active','2026-10-21',NULL,0),
('item-jr-tray','cat-trays','Jr. Cook Out Tray','jr-cook-out-tray','Junior tray meal. Included entrée, side count and beverage rules should be verified against the local menu board.','active','2026-10-21','Approx. $4.99–$6.99; location and selection vary',1),
('item-regular-tray','cat-trays','Regular Cook Out Tray','regular-cook-out-tray','Regular tray meal; configurations and prices vary by selected entrée and location.','active','2026-10-21','Approx. $6.29–$7.99; location and selection vary',1),
('item-burger-tray','cat-trays','Burger Tray','burger-tray','Tray with burger entrée; sides, drink and any upgrades depend on local options.','active','2026-10-21',NULL,0),
('item-bbq-tray','cat-trays','BBQ Sandwich Tray','bbq-sandwich-tray','Tray with BBQ sandwich entrée; verify included sides, drink and local price.','active','2026-10-21',NULL,0),
('item-chicken-strip-tray','cat-trays','Chicken Strip Tray','chicken-strip-tray','Tray with chicken strips entrée; verify included sides, drink and local price.','active','2026-10-21',NULL,0),
('item-hot-dog-tray','cat-trays','Hot Dog Tray','hot-dog-tray','Tray with hot dog entrée; verify local combination options and price.','active','2026-10-21',NULL,0);

