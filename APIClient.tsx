import {createEmojisushiAgent} from '@layerok/emojisushi-js-sdk';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {observer} from 'mobx-react-lite';
import {clearToken, getToken} from '~/common/token/token';

//https://api.emojisushi.com.ua/api
//https://stage-api.emojisushi.com.ua/api
export const agent = createEmojisushiAgent({
  service: 'https://stage-api.emojisushi.com.ua/api',
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
