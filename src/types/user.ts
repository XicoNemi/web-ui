export enum UserRoles {
  Common = 'Common',
  BusinessOwner = 'BusinessOwner',
  SuperAdmin = 'SuperAdmin',
}

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
  user: User;
  token: string;
}

export interface CreateUser {
  name: string;
  lastname: string;
  email: string;
  password: string;
  tel: string;
  type: UserRoles;
  gender: string;
  birthday: number;
}

export interface User {
  id: string;
  subscriptionId: null;
  facebookId: null;
  name: string;
  lastname: string;
  email: string;
  password: string;
  tel: string;
  birthday: number;
  gender: string;
  url_image: string;
  type: UserRoles;
  status: boolean;
  token: null;
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
