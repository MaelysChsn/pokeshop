/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_POKESHOP_BASE_URL: string;
    readonly VITE_API_TIMEOUT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

