CREATE TABLE IF NOT EXISTS admin_email_verifications (
 id TEXT PRIMARY KEY,
 email TEXT NOT NULL,
 code_hash TEXT NOT NULL,
 expires_at TEXT NOT NULL,
 attempts INTEGER NOT NULL DEFAULT 0,
 verified_at TEXT,
 created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_admin_email_verifications_email ON admin_email_verifications(email,created_at);
