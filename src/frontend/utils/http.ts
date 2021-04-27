import axios from 'axios';

const getApiUrl = (endpoint: string) => `/api/v1/${endpoint}`;

export const makePostRequestToApi = (endpoint: string, data: any) => {
  return axios.post(getApiUrl(endpoint), data)
    .then(response => response.data);
}