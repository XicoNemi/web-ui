import axios from '@lib/axios';
import type { AxiosResponse } from 'axios';

// Types
// import type { ProfileResponse } from '@/types/api';
import { UserRoles, type CreateUser, type User } from '@/types/user';
import type { Business, CreateBusiness } from '@/types/business';

// ### USERS ###

export const getUserById = (userId: string): Promise<User> =>
  axios.get<User>(`/users/${String(userId)}`).then((res: AxiosResponse<User>) => res.data);

export const getAllUsers = (): Promise<User[]> =>
  axios.get<User[]>('/users').then((res: AxiosResponse<User[]>) => res.data);

export const createUser = (data: CreateUser): Promise<CreateUser> =>
  axios.post<User>('/users/super-admin', data).then((res: AxiosResponse<User>) => res.data);

export const updateUserById = ({ userId, data }: { userId: string; data: CreateUser }): Promise<CreateUser> =>
  axios.put<User>(`/users/${String(userId)}`, data).then((res: AxiosResponse<User>) => res.data);

export const deleteUserById = (userId: string): Promise<void> =>
  axios.delete(`/users/delete/${String(userId)}`).then((res: AxiosResponse<void>) => res.data);

// ### BUSINESSES ###

export const getBusinesses = (): Promise<Business[]> =>
  axios.get<Business[]>('/businesses').then((res: AxiosResponse<Business[]>) => res.data);

export const getBusinessById = (businessId: string): Promise<Business> =>
  axios.get<Business>(`/businesses/${businessId}`).then((res: AxiosResponse<Business>) => res.data);

export const createBusiness = (data: CreateBusiness): Promise<CreateBusiness> =>
  axios.post<Business>('/businesses', data).then((res: AxiosResponse<Business>) => res.data);

export const updateBusinessById = ({
  businessId,
  data,
}: {
  businessId: string;
  data: CreateBusiness;
}): Promise<CreateBusiness> =>
  axios.put<Business>(`/businesses/${String(businessId)}`, data).then((res: AxiosResponse<Business>) => res.data);

export const deleteBusinessById = (businessId: string): Promise<void> =>
  axios.delete(`/businesses/${String(businessId)}`).then((res: AxiosResponse<void>) => res.data);

// ### OWNERS ####

export const getAllOwners = (): Promise<User[]> =>
  getAllUsers().then((users: User[]) => users.filter((user: User) => user.type === UserRoles.BusinessOwner));

// ### PROFILE ###
export const getProfile = (userId: string): Promise<User> =>
  axios.get<User>(`/users/${userId}`).then((res: AxiosResponse<User>) => res.data);

export const updatePassword = (userId: string, newPassword: string): Promise<void> =>
  axios.patch(`/users/${userId}`, { password: newPassword }).then((res: AxiosResponse<void>) => res.data);

export const uploadUserImage = async ({ userId, file }: { userId: string; file: Blob }): Promise<void> => {
  const formData = new FormData();
  formData.append('file', file);

  await axios
    .put(`/images/Users/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: AxiosResponse<void>) => res.data);
};
