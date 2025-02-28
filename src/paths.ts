export const paths = {
  dashboard: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },
  users: {
    list: '/users',
    create: '/users/create',
    edit: (userId: string): string => `/users/${userId}/update`,
    delete: (userId: string): string => `/users/${userId}/delete`,
  },
};
