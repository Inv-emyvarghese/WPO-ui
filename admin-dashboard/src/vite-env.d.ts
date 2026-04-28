/// <reference types="vite/client" />

declare module "world-atlas/*.json" {
  const value: {
    type: string;
    objects: Record<string, { type: string; geometries: unknown[]; arcs?: unknown }>;
    arcs: unknown;
    transform?: unknown;
  };
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SSO_CLIENT_ID: string;
  readonly VITE_REFRESH_BUFFER_TIME: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
