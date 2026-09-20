# Cloudflare Setup

## 1. Create D1
Create a D1 database named `cookout-menu` in the intended Cloudflare account.

## 2. Configure binding
Copy `wrangler.toml.example` to `wrangler.toml` and replace the placeholder database ID with the real ID.

## 3. Apply migrations
Apply migrations in order:
- db/migrations/0001_initial.sql
- db/migrations/0002_admin_audit.sql
- db/migrations/0003_hardening.sql

Do not commit `wrangler.toml` if it contains environment-specific values that should remain private.

## 4. Runtime
The web runtime must expose the D1 binding as `DB`. The repository's database helper should receive that server-side environment.

## 5. Secrets
Use Cloudflare secrets/environment configuration for authentication and Turnstile secrets. Never place secrets in client code, GitHub source, or public variables.

## 6. Pre-launch verification
Confirm:
- D1 queries succeed.
- migrations are applied.
- admin auth works server-side.
- public forms are rate-limited.
- Turnstile is enforced where required.
- production domain is configured.
