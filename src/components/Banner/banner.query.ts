import {QueryOptions} from '@tanstack/react-query';
import {IGetBannersRes} from '~/api';
import {agent} from '~/../APIClient.tsx';

export const bannerQueryKeys = {
  _def: ['banner'],
  all: () => [...bannerQueryKeys._def, 'all'],
};

export const bannerQuery: QueryOptions<IGetBannersRes> = {
  queryKey: bannerQueryKeys.all(),
  queryFn: () => agent.getBanners(),
};
