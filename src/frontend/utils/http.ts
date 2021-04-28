import axios from 'axios';
import { getAuthTokens } from './auth';

const getApiUrl = (endpoint: string) => {
  return `/api/v1/${endpoint}`;
};

export const makeAuthenticatedApiGetRequest = (endpoint: string) => {
  const tokens = getAuthTokens();
  if (tokens === null) {
    throw new Error("User is not authenticated");
  }

  return axios.get(getApiUrl(endpoint),
    {
      headers: {
        authorization: tokens.accessToken
      }
    })
    .then(response => response.data);
}

export const makeApiPostRequest = (endpoint: string, data: any) => {
  return axios.post(getApiUrl(endpoint), data)
    .then(response => response.data);
}