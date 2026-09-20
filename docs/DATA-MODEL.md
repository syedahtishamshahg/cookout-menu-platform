# Data Model

The platform is data-first. Pages must render from verified records rather than hard-coded marketing copy.

Core entities:
- menu_categories
- menu_items
- menu_variants
- prices
- price_sources
- price_history
- nutrition
- nutrition_sources
- locations
- location_hours
- articles
- faqs
- corrections
- audit_logs

Trust rules:
1. Never invent a price, nutrition value, address, opening hour, review or source.
2. Every price/nutrition record should retain its source and capture/verification date.
3. Location-dependent prices must be stored per location when possible.
4. Unverified submissions remain clearly labelled and are never presented as verified facts.
5. Official Cook Out material is treated as a primary source; this site remains independent/unofficial.
