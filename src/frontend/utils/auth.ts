import { AuthenticationResponse } from "../../common/entities/auth.entity";

export const login = (username: string, password: string) => {

}

export const clearAuthTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('expires_in');
}

/**
 * Stores auth tokens in localstorage.
 *
 * @param authTokens 
 */
export const storeAuthTokens = (authTokens: AuthenticationResponse) => {
  localStorage.setItem('access_token', authTokens.accessToken);
  localStorage.setItem('refresh_token', authTokens.refreshToken);
  localStorage.setItem('expires_in', authTokens.expiresIn.toString());
}

/**
 * Retrieves the auth tokens from localstorage.
 *
 * @returns The auth tokens or false otherwise
 */
export const getAuthTokens = (): AuthenticationResponse | null => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  const expiresIn = localStorage.getItem('expires_in');

  if (!accessToken || !refreshToken || !expiresIn) {
    return null;
  }

  return {
    accessToken: localStorage.getItem('access_token') || '',
    refreshToken: localStorage.getItem('refresh_token') || '',
    expiresIn: Number.parseInt(localStorage.getItem('expires_in') || ''),
  }
}