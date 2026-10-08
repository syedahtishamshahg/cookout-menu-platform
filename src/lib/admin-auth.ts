import { getDatabase } from "@/lib/db";

const COOKIE = "cookout_admin_session";
const SESSION_DAYS = 7;

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, "0")).join("");
}
function hexToBytes(hex: string) {
  const out = new Uint8Array(hex.length / 2);
  for (let i=0;i<out.length;i++) out[i]=parseInt(hex.slice(i*2,i*2+2),16);
  return out;
}
async function sha256(value: string) {
  const data = new TextEncoder().encode(value);
  return bytesToHex(new Uint8Array(await crypto.subtle.digest("SHA-256", data)));
}
export async function hashPassword(password: string, saltHex?: string) {
  const salt = saltHex ? hexToBytes(saltHex) : crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({name:"PBKDF2",salt,iterations:120000,hash:"SHA-256"},key,256);
  return "pbkdf2$120000$"+bytesToHex(salt)+"$"+bytesToHex(new Uint8Array(bits));
}
export async function verifyPassword(password: string, stored: string) {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;
  return (await hashPassword(password, parts[2])) === stored;
}
function token() { return bytesToHex(crypto.getRandomValues(new Uint8Array(32))); }
function now() { return new Date().toISOString(); }
function expires() { return new Date(Date.now()+SESSION_DAYS*86400000).toISOString(); }

export async function createSession(adminId: string) {
  const raw = token();
  const db = getDatabase();
  await db.prepare("INSERT INTO admin_sessions (id,admin_id,token_hash,expires_at,created_at) VALUES (?,?,?,?,?)")
    .bind(crypto.randomUUID(),adminId,await sha256(raw),expires(),now()).all();
  return raw;
}
export async function getAdminFromRequest(request: Request) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp("(^|;\\s*)"+COOKIE+"=([^;]+)"));
  if (!match) return null;
  const hash = await sha256(decodeURIComponent(match[2]));
  const db = getDatabase();
  const result = await db.prepare("SELECT a.id,a.email,a.role,a.status FROM admin_sessions s JOIN admin_accounts a ON a.id=s.admin_id WHERE s.token_hash=? AND s.expires_at>? AND a.status='active' LIMIT 1")
    .bind(hash,now()).all() as {results?:Array<{id:string;email:string;role:string;status:string}>};
  return result.results?.[0] ?? null;
}
export async function audit(adminId:string,action:string,entityType:string,entityId?:string,details?:unknown){
  const db=getDatabase();
  await db.prepare("INSERT INTO admin_audit_log (id,admin_id,action,entity_type,entity_id,details,created_at) VALUES (?,?,?,?,?,?,?)")
    .bind(crypto.randomUUID(),adminId,action,entityType,entityId??null,details?JSON.stringify(details):null,now()).all();
}
export const sessionCookie = (value:string) => COOKIE+"="+encodeURIComponent(value)+"; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age="+(SESSION_DAYS*86400);
export const clearSessionCookie = () => COOKIE+"=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0";
