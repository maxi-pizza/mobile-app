import axios from 'axios';
import {
  AxiosAuthRefreshRequestConfig,
  RegisterResData,
  LoginResData,
  IMeResData,
  IGetDataRes,
  IGetBonusHistoryRes,
  IGetBonusOptionsRes,
  IGetAppAllowedVersionsRes,
  IGetContacts,
} from './types';

export function createAgent(options: {service: string}) {
  const {service} = options;
  const axiosClient = axios.create({
    baseURL: service,
  });
  const client = axiosClient;

  function log(data: any, version: string) {
    axiosClient.post('/log', {
      version: version,
      ...data,
    });
  }

  function getData(
    params: any,
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.get<IGetDataRes>('/data', {
      params,
      skipAuthRefresh: true,
      ...axiosConfig,
    } as AxiosAuthRefreshRequestConfig);
  }

  function placeOrder(
    params: {
      phone: string;
      name?: string;
      email?: string;
      products:{
        product_id: string;
        count: number
      }[];
      delivery_method_id: number;
      payment_method_id: number;
      address?: string;
      comment?: string;
      people_count?: number;
      change?: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('/placeOrder', params, axiosConfig);
  }

  function register(
    data: {
      email: string;
      phone: string;
      password: string;
      password_confirmation: string;
      name: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post<RegisterResData>('auth/register', data, axiosConfig);
  }

  function login(
    data: {email: string; password: string},
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post<LoginResData>('auth/login', data, axiosConfig);
  }

  function logout(
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post<LoginResData>('auth/logout', undefined, axiosConfig);
  }

  function restorePassword(
    data: {
      email: string;
      redirect_url: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('auth/restore-password', data, axiosConfig);
  }

  function resetPassword(
    data: {code: string; password: string},
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('auth/reset-password', data, axiosConfig);
  }

  function updateUserPassword(
    data: {
      password_old: string;
      password: string;
      password_confirmation: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('user/password', data, axiosConfig);
  }

  function me(
    params: {} = {},
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.get<IMeResData>('/auth/me', {
      params,
      ...axiosConfig,
    });
  }

  function updateUser(
    data: {
      name?: string;
      surname?: string;
      phone?: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('user', data, axiosConfig);
  }

  function getBonusHistory(params = {}, axiosConfig = {}) {
    return client.get<IGetBonusHistoryRes>(
      'user/bonus/history',
      Object.assign({params, skipAuthRefresh: true}, axiosConfig),
    );
  }
  function getBonusOptions(params = {}, axiosConfig = {}) {
    return client.get<IGetBonusOptionsRes>(
      'bonuses/options',
      Object.assign({params, skipAuthRefresh: true}, axiosConfig),
    );
  }
  function getAppAllowedVersion(params = {}, axiosConfig = {}) {
    return client.get<IGetAppAllowedVersionsRes>(
      'app-version',
      Object.assign({params, skipAuthRefresh: true}, axiosConfig),
    );
  }
  function getContacts(params = {}, axiosConfig = {}) {
    return client.get<IGetContacts>(
      'contacts',
      Object.assign({params, skipAuthRefresh: true}, axiosConfig),
    );
  }
  return {
    axiosClient,
    auth: {
      register,
      login,
      me,
      logout,
      restorePassword,
      resetPassword,
    },
    getData,
    placeOrder,
    updateUserPassword,
    updateUser,
    log,
    getBonusHistory,
    getBonusOptions,
    getAppAllowedVersion,
    getContacts
  };
}
