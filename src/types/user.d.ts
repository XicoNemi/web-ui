export type UserRoles = 'Admin' | 'User';

export interface SignUp {
  name: string;
  lastname: string;
  dob: Date;
  phone: string;
  email: string;
  username: string;
  role: string;
  password: string;
}

export interface SignInResponse {
  token: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  dob: Date;
  phone: string;
  email: string;
  username: string;
  role: UserRoles;
  enabled: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  fullName: string;
  id: string;
}

export interface CreateUser {
  name: string;
  lastname: string;
  dob: Date;
  phone: string;
  email: string;
  username: string;
  role: UserRoles;
  password: string;
}

export interface UpdatePassword {
  newPassword: string;
  password: string;
}

export interface Session {
  _id:          string;
  user:         string;
  device:       string;
  location:     string;
  enabled:      boolean;
  refreshToken: string;
  loginTime:    Date;
  createdAt:    Date;
  updatedAt:    Date;
}

