# Cloudflare Runtime Verification

## Configured
- Worker entry: `.open-next/worker.js`
- Assets binding: `ASSETS`
- D1 binding: `DB`
- D1 database: `cookout-menu`
- OpenNext config: `open-next.config.ts`
- Database runtime access: `src/lib/db.ts`
- Database health endpoint: `/api/health/db`

## Verify locally
```bash
npm install
npm run cf-typegen
npm run typecheck
npm run build
```

## Apply remote migrations
```bash
npx wrangler@latest d1 migrations apply cookout-menu --remote
```

## Deploy
```bash
npm run deploy
```

After deployment, check `/api/health/db`. It should return:
```json
{"ok":true,"database":"connected"}
```

Never put Cloudflare API tokens or other secrets in source files or chat.
