import { getSiteURL } from '@lib/getSiteUrl';

export interface Config {
  site: {
    name: string;
    themeColor: string;
    url: string;
    version: string;
  };
}

export const config = {
  site: {
    name: 'XicoNemi',
    themeColor: '#E6077E',
    url: getSiteURL(),
    version: process.env.NEXT_PUBLIC_SITE_VERSION ?? '0.0.0',
  },
} satisfies Config;
