# Phase 11 — D1 Schema & Runtime Read Layer

Implemented:
- Versioned D1 migration containing core relational tables.
- Foreign keys between categories, menu items, nutrition, sources, locations and prices.
- Indexes for common menu, location and price queries.
- Nutrition lookup by menu-item slug.
- Verified-price read query.
- Active-location read query.
- Price-history query.

Production note:
The repository is prepared for D1, but a real Cloudflare database binding must be configured before these queries can run in production.

Next:
- Configure the actual D1 database and run migration 0001.
- Wire runtime environment into server-rendered pages.
- Add secure admin authentication.
- Add transactional verification/publish mutations.
- Add audit log table and events.
