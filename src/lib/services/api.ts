import axios from '@lib/axios';
import type { AxiosResponse } from 'axios';

// Types
import type { User } from '@/types/user';

export const getAllUsers = (): Promise<User[]> =>
  axios.get<User[]>('/users').then((res: AxiosResponse<User[]>) => res.data);
