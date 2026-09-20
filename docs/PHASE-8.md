# Phase 8 — Database Repository Layer

Implemented:
- Server-side repository functions for categories and menu items.
- Slug-based menu lookup.
- Archived records excluded from normal reads.
- Central source publication policy.
- Verified-only publication helper.

Architecture:
UI -> Server repository -> D1
No client-side database credentials.

Next:
- Runtime D1 binding in deployment.
- Database-backed server pages.
- Nutrition repository queries.
- Price/location repository queries.
- Admin mutations with authentication and audit logging.
