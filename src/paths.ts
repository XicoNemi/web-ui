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
  businesses: {
    list: '/businesses',
    create: '/businesses/create',
    details: (businessId: string): string => `/businesses/${businessId}`,
    edit: (businessId: string): string => `/businesses/${businessId}/update`,
    delete: (businessId: string): string => `/businesses/${businessId}/delete`,
  },
  todoList: '/todo-list',
  profile: '/profile',
};
