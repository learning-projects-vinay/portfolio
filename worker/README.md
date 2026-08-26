# Ask-AI Worker

A Cloudflare Worker that powers the "Ask my AI about me" chat widget on the portfolio. It proxies the Claude API server-side so the API key never reaches the browser, locks CORS to the portfolio's origin, and grounds every answer in Vinay's resume via the system prompt in [src/index.ts](src/index.ts).

## Deploy (one time, ~5 minutes)

Prerequisites: a free [Cloudflare account](https://dash.cloudflare.com/sign-up) and an [Anthropic API key](https://platform.claude.com/).

```bash
cd worker
npm install
npx wrangler login                          # opens browser, authorizes the CLI
npx wrangler secret put ANTHROPIC_API_KEY   # paste your key when prompted
npx wrangler deploy
```

`deploy` prints the worker URL, e.g. `https://vinay-ask-ai.<your-subdomain>.workers.dev`.

## Wire the site to it

Add the URL to the portfolio's env files, then rebuild/redeploy the site:

```bash
# example.env — this is what the GitHub Actions deploy copies to .env, so the
# production site reads it from here. Uncomment the existing line and set:
NEXT_PUBLIC_ASK_AI_URL="https://vinay-ask-ai.<your-subdomain>.workers.dev"

# .env.local — same line, for local development
```

For the deployed site, set it as the repository variable `NEXT_PUBLIC_ASK_AI_URL`
(Settings -> Secrets and variables -> Actions -> Variables). The deploy workflow
passes it into the build and it overrides `example.env`. It is a public endpoint,
not a secret, so a variable is the right place for it.

The widget hides itself when `NEXT_PUBLIC_ASK_AI_URL` is unset, so the site keeps working before this step.

## Configuration

All in [wrangler.toml](wrangler.toml):

- `MODEL` — `claude-haiku-4-5` by default (cheap: ~$1/$5 per million tokens; a typical Q&A costs a fraction of a cent). Switch to `claude-opus-5` for maximum answer quality.
- `ALLOWED_ORIGINS` — update when you move to a custom domain.
- The `[[unsafe.bindings]]` block — the per-IP rate limit (10 requests/minute).
  **The worker refuses every request with a 503 if this binding is missing**, on
  purpose: it is the only thing capping spend on the API key, so it must not be
  possible to deploy without it. Raise the `limit` if legitimate visitors hit it.

Guardrails built in: 10 requests/minute per IP, requests only from allowed origins, a 16 KB body cap, max 12 messages × 1000 chars per request, 400-token answers, a 30s upstream timeout, and off-topic questions redirected by the system prompt.

A note on the origin allowlist: it stops other *websites* from embedding this endpoint, but an `Origin` header is trivially forged by anything that isn't a browser. Treat the rate limit — not the allowlist — as the real abuse control, and keep an eye on the Anthropic usage dashboard.

## Updating the profile

The assistant's knowledge lives in `SYSTEM_PROMPT` in [src/index.ts](src/index.ts). When the resume changes, update it there and run `npx wrangler deploy` again.
