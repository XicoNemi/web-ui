import axios from '@lib/axios';
import type { AxiosResponse } from 'axios';

// Types
import type { CreateUser, User } from '@/types/user';

export const getUserById = (userId: number): Promise<User> =>
  axios.get<User>(`/users/${String(userId)}`).then((res: AxiosResponse<User>) => res.data);

export const getAllUsers = (): Promise<User[]> =>
  axios.get<User[]>('/users').then((res: AxiosResponse<User[]>) => res.data);

export const createUser = (data: CreateUser): Promise<CreateUser> =>
  axios.post<User>('/users/super-admin', data).then((res: AxiosResponse<User>) => res.data);

export const updateUserById = ({ userId, data }: { userId: number; data: CreateUser }): Promise<CreateUser> =>
  axios.put<User>(`/users/${String(userId)}`, data).then((res: AxiosResponse<User>) => res.data);
