/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SENTRY_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
