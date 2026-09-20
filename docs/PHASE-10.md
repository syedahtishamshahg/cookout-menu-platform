# Phase 10 — Database Seed & Source Linking

Implemented:
- Starter menu records linked to category IDs.
- Nutrition records linked to menu item IDs.
- Source record attached to nutrition data.
- Serving-size and macro/micronutrient fields preserved.
- Seed is idempotent through INSERT OR IGNORE.

Important:
- Seed records are not marked as verified automatically.
- Production publication should follow current-source review.
- The source URL is kept as a provenance pointer, not as proof that every record is currently unchanged.

Next:
- Execute the schema and seed against a real D1 database.
- Build D1-backed server rendering.
- Add authentication and protected admin mutations.
- Add location/source ingestion.
- Add verification timestamps and audit events.
