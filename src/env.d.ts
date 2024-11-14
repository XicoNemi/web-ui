export interface Env {
  // App
  NEXT_PUBLIC_SITE_URL?: string;
  NEXT_PUBLIC_SITE_VERSION?: string;
  NEXT_PUBLIC_VERCEL_URL?: string;

  // API
  NEXT_PUBLIC_API_URL: string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
