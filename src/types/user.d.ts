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

export interface SignInResponse extends User {}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  tel: string;
  birthday: Date;
  type: string;
  travelId: null;
  active: boolean;
  token: null;
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
  _id: string;
  user: string;
  device: string;
  location: string;
  enabled: boolean;
  refreshToken: string;
  loginTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
