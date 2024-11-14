import axios from 'axios';

const axiosServices = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1' });

// Add an interceptor to modify requests
axiosServices.interceptors.request.use(
  async (config) => {
    try {
      const serviceToken = localStorage.getItem('serviceToken');

      if (serviceToken) {
        config.headers['auth-token'] = serviceToken;
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(new Error(error instanceof Error ? error.message : String(error)))
);

export default axiosServices;
