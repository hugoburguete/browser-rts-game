import React, { createContext, ReactNode, useContext, useState } from 'react';
import {
  clearAuthTokens,
  getAuthTokens,
  storeAuthTokens,
} from '../../utils/auth';
import {
  makeApiPostRequest,
  makeAuthenticatedApiGetRequest,
} from '../../utils/http';

const authContext = createContext({
  user: '',
  isUserLoading: true,
  loadUser: async () => {},
  login: async (email: string, password: string) => {},
  logout: () => {},
});

export function useAuth() {
  return useContext(authContext);
}

interface ProvideAuthPropsInterface {
  children: ReactNode;
}

export function ProvideAuth({ children }: ProvideAuthPropsInterface) {
  const [user, setUser] = useState('');
  const [isUserLoading, setIsUserLoading] = useState(true);

  const auth = {
    user,
    isUserLoading,
    loadUser: async () => {
      setIsUserLoading(true);
      if (getAuthTokens() !== null) {
        try {
          const response = await makeAuthenticatedApiGetRequest('user');
          setUser(response.username);
        } catch (err) {
          setIsUserLoading(false);
        }
      }
      setIsUserLoading(false);
    },
    login: async (email: string, password: string) => {
      const response = await makeApiPostRequest('login', {
        email: email,
        password: password,
      });
      storeAuthTokens(response);
      setUser(email);
    },
    logout: () => {
      clearAuthTokens();
      setUser('');
    },
  };

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
