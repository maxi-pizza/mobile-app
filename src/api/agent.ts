import axios from 'axios';
import {
  AxiosAuthRefreshRequestConfig,
  RegisterResData,
  LoginResData,
  IFetchUserResData,
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
      firstname?: string; // це ім'я зберігаеться на сайті
      lastname?: string;
      email?: string;

      shipping_method_id: number;
      payment_method_id: number;
      spot_id: number;
      address?: string;

      comment?: string;
      sticks?: number;
      change?: string;
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('order/place', params, axiosConfig);
  }

  function placeOrderV2(
    params: {
      phone: string;
      firstname?: string;
      lastname?: string;
      email?: string;

      shipping_method_id: number;
      payment_method_id: number;
      spot_id: number;
      address?: string;

      comment?: string;
      sticks?: number;
      change?: string;

      cart: {
        items: {
          id: string;
          variant_id?: string;
          quantity: number;
        }[];
      };
    },
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('order/v2/place', params, axiosConfig);
  }

  function register(
    data: {
      email: string;
      password: string;
      password_confirmation: string;
      name: string;
      surname: string;
      activate: boolean;
      auto_login: boolean;
      agree: boolean;
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

  function fetchUser(
    params: {} = {},
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.get<IFetchUserResData>('user', {
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

  function updateCustomer(
    data: {firstname?: string; lastname?: string},
    axiosConfig: AxiosAuthRefreshRequestConfig = {},
  ) {
    return client.post('user/customer', data, axiosConfig);
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
    getData,
    placeOrder,
    placeOrderV2,
    register,
    login,
    restorePassword,
    resetPassword,
    updateUserPassword,
    fetchUser,
    updateUser,
    updateCustomer,
    log,
    getBonusHistory,
    getBonusOptions,
    getAppAllowedVersion,
    getContacts
  };
}
