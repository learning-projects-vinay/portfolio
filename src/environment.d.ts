declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ASSET_PREFIX: string;
            NEXT_APP_URL: string;
            /** Deployed Cloudflare Worker URL for the Ask-AI widget. Unset = widget hidden. */
            NEXT_PUBLIC_ASK_AI_URL?: string;
            /** ISO timestamp injected at build time by next.config.ts. */
            NEXT_PUBLIC_BUILD_DATE: string;
        }
    }
}

export {}
