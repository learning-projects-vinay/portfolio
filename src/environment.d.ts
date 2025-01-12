declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ASSET_PREFIX: string;
            NEXT_APP_URL: string;
        }
    }
}

export {}
