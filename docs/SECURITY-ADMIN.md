# Admin & Security Foundation

Required before production:
- Authentication and server-side role checks.
- Validate and sanitize every submitted field.
- Parameterized database queries.
- Rate-limit public submissions.
- Cloudflare Turnstile or equivalent anti-abuse control.
- CSRF protection for cookie-based mutations.
- Secure headers and restrictive CORS.
- Audit verification, rejection, publish and delete actions.
- Backups/exports of important data.
- Never expose internal error details.

Verification workflow:
Pending -> In Review -> Verify -> Accept/Reject -> Audit Log -> Publish.

The admin UI is only a foundation until authentication and authorization are implemented server-side.
