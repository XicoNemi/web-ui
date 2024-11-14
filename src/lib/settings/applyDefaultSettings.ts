import type { Settings } from '@/types/settings';

export function applyDefaultSettings(settings: Partial<Settings>): Settings {
  return {
    direction: 'ltr',
    ...settings,
  };
}
