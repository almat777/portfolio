# Assistant request limits

The deployed backend is generated as `apps-script/Code.gs`. Its source is `google-apps-script.gs`. Configure it using Apps Script **Project Settings → Script Properties**:

| Property | Default | Allowed values |
| --- | --- | --- |
| `CHATBOT_HOURLY_LIMIT` | 15 | Integer 1–100 |
| `CHATBOT_DAILY_LIMIT` | 60 | Integer 1–1000 |
| `CHATBOT_GLOBAL_DAILY_LIMIT` | 150 | Integer 1–1000 |

Invalid explicit settings deny AI requests rather than disabling limits. Omit a property to use its default.

Hourly and daily windows use fixed UTC calendar boundaries. User quotas are tied to a browser-generated ID; visitors can replace that ID, so this is a convenience limit rather than authentication. A separate durable global ledger caps the total daily provider calls regardless of visitor IDs. There are no IP whitelists, localhost exemptions, client-supplied referrer exemptions or API-key rotation.

All reservations use Script Properties under a Script Lock. If locking, validation or storage fails, no model call is made. Reservations count before the provider call and are not refunded on upstream failure; there is no automatic retry. The global ledger is stored first so partial writes can overcount rather than exceed the shared ceiling. Client records are cleared at the next UTC day under the same lock, leaving configuration untouched. No evictable CacheService counter is used for the global ceiling.

This limits request count, not exact monetary cost. Google project quotas and billing controls remain independent. The backend stores counters and hashed browser IDs; it does not store questions, answers, raw IP addresses or conversation transcripts. User text sent to Gemini is subject to the provider's terms and settings.

Inputs are capped at 32 KiB on the wire, questions at 1000 characters, history at 12 recent messages and 12000 sanitized characters. The browser also trims URL-encoded history to fit its request budget. Privileged client history roles and additional client fields cannot replace the server-maintained identity or facts.

Relevant error codes: `RATE_LIMITED`, `DAILY_LIMIT`, `GLOBAL_DAILY_LIMIT`, `SERVICE_BUSY`, `PROVIDER_RATE_LIMITED`. Errors can include `retryAfter` in seconds. The public interface shows a labelled portfolio answer when live AI replies are unavailable.

See `ASSISTANT_SETUP.md` for deployment and live verification. Tests in `tests/chatbot-backend.test.cjs` cover UTC rollover, shared limits, lock contention, partial storage failure and spoofed client fields.
