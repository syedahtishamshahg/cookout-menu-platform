# Phase 12 — Verification & Audit Foundation

Implemented:
- Admin user table.
- Review queue table.
- Audit log table.
- Verification status transition rules.
- Admin review queue UI foundation.
- Indexes for review and audit lookups.

Security boundary:
This phase intentionally does not ship a fake password/login system. Production authentication must use a real identity provider/session mechanism and enforce authorization on the server for every mutation.

Verification:
Pending -> In Review -> Verified/Rejected.
Verified records can be returned to pending when a new verification cycle is required.

Next:
- Choose and configure a real authentication mechanism.
- Protect admin routes and mutations.
- Implement transactional verify/reject actions.
- Write immutable audit events for every mutation.
- Add public correction/price submission forms with anti-abuse controls.
