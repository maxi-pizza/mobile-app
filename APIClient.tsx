import {createEmojisushiAgent} from '@layerok/emojisushi-js-sdk';
import { getToken } from '~/common/token/token';

//https://api.emojisushi.com.ua/api
//https://stage-api.emojisushi.com.ua/api
export const agent = createEmojisushiAgent({
  service: 'https://stage-api.emojisushi.com.ua/api',
});

agent.axiosClient.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});