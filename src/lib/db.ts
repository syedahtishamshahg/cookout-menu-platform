import { env as cloudflareEnv } from "cloudflare:workers";

export type D1DatabaseLike = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      all: () => Promise<unknown>;
    };
    all: () => Promise<unknown>;
  };
};

export function getDatabase(overrideEnv?: Record<string, unknown>) {
  const runtimeEnv =
    overrideEnv ?? (cloudflareEnv as unknown as Record<string, unknown>);
  const db = runtimeEnv.DB as D1DatabaseLike | undefined;

  if (!db) {
    throw new Error("Database binding DB is not configured.");
  }

  return db;
}
