# Phase 9 — Data Access Layer

Implemented:
- D1 repository functions for nutrition.
- D1 repository functions for verified prices.
- D1 repository functions for locations.
- D1 price-history query.
- Nutrition UI explicitly identifies the current development fallback.

Data rule:
Verified prices only are returned by the price repository. This prevents unverified records from accidentally appearing as current prices.

Next:
- Wire D1 reads into server-rendered pages through the deployment runtime.
- Create full nutrition import.
- Create source-backed location records.
- Create verified price records.
- Build admin mutations and audit logging.
