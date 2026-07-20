/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRX_API_BASE_URL?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_META_PIXEL_ID?: string;
  readonly VITE_ANALYTICS_DEBUG?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
