# Database Setup

The repository now contains a D1-compatible schema and starter category seed.

## Production setup
1. Create a Cloudflare D1 database named cookout-menu.
2. Add its real database ID to deployment configuration.
3. Apply db/schema.sql.
4. Apply db/seed.sql.
5. Configure the runtime DB binding.
6. Keep credentials and secrets out of Git.

Do not insert prices or nutrition values unless the record has source and capture/verification metadata.

Schema changes should be documented and handled through migrations. Back up important data before destructive changes.
