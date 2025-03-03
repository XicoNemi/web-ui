import axios from '@lib/axios';
import type { AxiosResponse } from 'axios';

// Types
import type { Business, CreateBusiness } from '@/types/business';
import type { CreateUser, User } from '@/types/user';

// ### USERS ###

export const getUserById = (userId: number): Promise<User> =>
  axios.get<User>(`/users/${String(userId)}`).then((res: AxiosResponse<User>) => res.data);

export const getAllUsers = (): Promise<User[]> =>
  axios.get<User[]>('/users').then((res: AxiosResponse<User[]>) => res.data);

export const createUser = (data: CreateUser): Promise<CreateUser> =>
  axios.post<User>('/users/super-admin', data).then((res: AxiosResponse<User>) => res.data);

export const updateUserById = ({ userId, data }: { userId: number; data: CreateUser }): Promise<CreateUser> =>
  axios.put<User>(`/users/${String(userId)}`, data).then((res: AxiosResponse<User>) => res.data);

export const deleteUserById = (userId: number): Promise<void> =>
  axios.delete(`/users/delete/${String(userId)}`).then((res: AxiosResponse<void>) => res.data);

// ### BUSINESSES ###

export const getBusinesses = (): Promise<Business[]> =>
  axios.get<Business[]>('/business').then((res: AxiosResponse<Business[]>) => res.data);

export const getBusinessById = (businessId: string): Promise<Business> =>
  axios.get<Business>(`/business/${businessId}`).then((res: AxiosResponse<Business>) => res.data);

export const createBusiness = (data: CreateBusiness): Promise<CreateBusiness> =>
  axios.post<Business>('/business', data).then((res: AxiosResponse<Business>) => res.data);

export const updateBusinessById = ({
  businessId,
  data,
}: {
  businessId: number;
  data: CreateBusiness;
}): Promise<CreateBusiness> =>
  axios.put<Business>(`/business/${String(businessId)}`, data).then((res: AxiosResponse<Business>) => res.data);

export const deleteBusinessById = (businessId: number): Promise<void> =>
  axios.delete(`/business/${String(businessId)}`).then((res: AxiosResponse<void>) => res.data);

// ### OWNERS ####

export const getAllOwners = (): Promise<User[]> =>
  getAllUsers().then((users: User[]) => users.filter((user: User) => user.type === 'BusinessOwner'));
