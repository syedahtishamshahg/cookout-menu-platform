# Production Gate

Before launch:
- [ ] CI typecheck passes.
- [ ] CI production build passes.
- [ ] Real D1 binding configured.
- [ ] Migrations applied to the intended database.
- [ ] No secrets committed.
- [ ] Admin authentication and server-side authorization enabled.
- [ ] Public submissions persisted server-side and rate-limited.
- [ ] Turnstile enabled where appropriate.
- [ ] Verified sources attached to published prices/nutrition/locations.
- [ ] Search Console and Bing Webmaster configured.
- [ ] Sitemap and robots verified.
- [ ] Mobile, accessibility and Core Web Vitals QA completed.
- [ ] Final domain and canonical URLs verified.
- [ ] Legal/privacy copy reviewed for the actual production stack.
- [ ] Backup/export procedure tested.

A green GitHub build alone does not mean the site is production-ready.
