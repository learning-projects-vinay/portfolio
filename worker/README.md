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

The widget hides itself when `NEXT_PUBLIC_ASK_AI_URL` is unset, so the site keeps working before this step.

## Configuration

All in [wrangler.toml](wrangler.toml):

- `MODEL` — `claude-haiku-4-5` by default (cheap: ~$1/$5 per million tokens; a typical Q&A costs a fraction of a cent). Switch to `claude-opus-5` for maximum answer quality.
- `ALLOWED_ORIGINS` — update when you move to a custom domain.

Guardrails built in: requests only from allowed origins, max 12 messages × 1000 chars per request, 400-token answers, off-topic questions redirected by the system prompt.

## Updating the profile

The assistant's knowledge lives in `SYSTEM_PROMPT` in [src/index.ts](src/index.ts). When the resume changes, update it there and run `npx wrangler deploy` again.
