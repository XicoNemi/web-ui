import type { User } from '@types/user';

export interface AuthContextValue {
  isLoggedIn: boolean;
  isInitialized: boolean;
  user: User | null;
  login: (params: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}
