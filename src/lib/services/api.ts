import axios from '@lib/axios';
import type { AxiosResponse } from 'axios';

// Types
import type { CreateUser, User } from '@/types/user';

export const getAllUsers = (): Promise<User[]> =>
  axios.get<User[]>('/users').then((res: AxiosResponse<User[]>) => res.data);

export const createUser = (data: CreateUser): Promise<CreateUser> =>
  axios.post<User>('/users/super-admin', data).then((res: AxiosResponse<User>) => res.data);
