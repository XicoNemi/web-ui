'use client';

import React, { createContext, useEffect, useState } from 'react';
// Types
import type { ReactNode } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
// Third Party Imports
import { jwtDecode } from 'jwt-decode';

// Project Imports
import axios from '@/lib/axios';
import { logger } from '@/lib/default-logger';

import Loader from '@/components/loader';
import type { AuthContextValue } from '@/contexts/auth/types';

import type { SignInResponse, User } from '@/types/user';

export interface SignUpParams {
  name: string;
  lastname: string;
  dob: Date;
  phone: string;
  email: string;
  username: string;
  role: string;
  password: string;
}

export interface SignInWithPasswordParams {
  username: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

export const verifyToken = (serviceToken: string): boolean => {
  if (!serviceToken) {
    return false;
  }
  const decoded: { exp: number } = jwtDecode(serviceToken);

  return decoded.exp > Date.now() / 1000;
};

const setSession = async (serviceToken: string | null): Promise<void> => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    try {
      const refreshtoken = window.localStorage.getItem('refreshToken');
      await axios.post(
        '/auth/signout',
        {},
        {
          headers: {
            Authorization: `Bearer ${serviceToken}`,
            refreshtoken,
          },
        }
      );
      localStorage.clear();
      delete axios.defaults.headers.common.Authorization;
    } catch (error) {
      logger.error(error);
    }
  }
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }): React.JSX.Element {
  const queryClient = useQueryClient();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const init = async (): Promise<void> => {
      try {
        const serviceToken = localStorage.getItem('serviceToken');

        if (serviceToken && verifyToken(serviceToken)) {
          setIsLoggedIn(true);
          setUser(user);
        }
      } finally {
        setIsInitialized(true);
      }
    };

    void init();
  }, [user]);

  const login = async (params: { username: string; password: string }): Promise<void> => {
    const response: AxiosResponse<SignInResponse> = await axios.post<
      SignInResponse,
      AxiosResponse<SignInResponse>,
      SignInWithPasswordParams
    >('/auth/signin', params);

    const { token, refreshToken, user: userData } = response.data;
    localStorage.setItem('refreshToken', refreshToken);

    void setSession(token);

    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
    }
  };

  const logout = async (): Promise<void> => {
    await setSession(null);
    setIsLoggedIn(false);
    queryClient.clear();
    setUser(null);
  };

  if (!isInitialized) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isInitialized, user, login, logout }}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
