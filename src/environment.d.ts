declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NEXT_PUBLIC_ASSET_PREFIX: string;
        }
    }
}

export {}
