import {createAgent} from '~/api';
import {clearToken, getToken} from '~/common/token/token';
import {API_BASE_URL} from "~/constants.ts";

export const agent = createAgent({
  service: API_BASE_URL,
});

agent.axiosClient.interceptors.request.use(async config => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
   return config;
});
agent.axiosClient.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 406) {
      await clearToken();
    }
    return Promise.reject(error);
  },
);
