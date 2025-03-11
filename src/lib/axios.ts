import axios, { type AxiosError } from 'axios';

// Project Imports
import { paths } from '@/paths';
import { toast } from '@components/core/toaster';

const axiosServices = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

// Add an interceptor to modify requests
axiosServices.interceptors.request.use(
  async (config) => {
    try {
      const serviceToken = localStorage.getItem('serviceToken');

      if (serviceToken) {
        config.headers.Authorization = `Bearer ${serviceToken}`;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(new Error(error instanceof Error ? error.message : String(error)))
);

// Add an interceptor to handle responses
axiosServices.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const data = error.response.data as { error: boolean; message: string; details: unknown };
      if (data.error && data.message === 'Invalid token') {
        localStorage.removeItem('serviceToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('todos');

        toast.error('Sesión expirada, por favor inicia sesión nuevamente.');

        window.location.href = paths.auth.login;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosServices;
