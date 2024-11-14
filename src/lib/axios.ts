import axios from 'axios';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import type { ErrorResponse } from '@/types/api';
import type { IpInfo } from '@/types/ipinfo';

const axiosServices = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1' });

// Add an interceptor to modify requests
axiosServices.interceptors.request.use(
  async (config) => {
    try {
      const ipInfoResponse = await axios.get<IpInfo>(
        process.env.NEXT_APP_IPINFO_TOKEN
          ? `https://ipinfo.io/json?token=${process.env.NEXT_APP_IPINFO_TOKEN}`
          : 'https://ipinfo.io/json'
      );
      const { city, country, loc } = ipInfoResponse.data;
      const serviceToken = localStorage.getItem('serviceToken');

      if (serviceToken) {
        config.headers.Authorization = `Bearer ${serviceToken}`;
      }

      config.headers.device = navigator.userAgent;
      config.headers.location = `${city}, ${country} (${loc})`;

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(new Error(error instanceof Error ? error.message : String(error)))
);

axiosServices.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;
    const errorResponse = error.response?.data as ErrorResponse;
    if (
      error.response &&
      error.response.status === 401 &&
      errorResponse.message === 'Token de autenticación inválido.'
    ) {
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) return Promise.reject(new Error('No se encontró el token de refresco.'));

        const { data } = await axiosServices.post<{ token: string }>('/auth/refresh-token', null, {
          headers: {
            refreshToken,
          },
        });
        const { token } = data;
        localStorage.setItem('serviceToken', token);
        if (originalRequest.headers) axiosServices.defaults.headers.common.Authorization = `Bearer ${token}`;

        return axios(originalRequest);
      } catch (err) {
        return Promise.reject(new Error(error instanceof Error ? error.message : String(error)));
      }
    }
    return Promise.reject(new Error(error instanceof Error ? error.message : String(error)));
  }
);

export default axiosServices;
