import {IGetProductsParams, IGetProductsRes} from '@layerok/emojisushi-js-sdk';
import {QueryOptions} from '@tanstack/react-query';
import {agent} from '../../../APIClient.tsx';


export const productsQueryKey = {
  def: ['products'],
  lists: () => [...productsQueryKey.def, 'list'],
  list: (params?: IGetProductsParams) => [
    ...productsQueryKey.lists(),
    params ?? 'all',
  ],
};


export const DEFAULT_PRODUCT_LIMIT = 9999;


export const productsQuery = (
    params: IGetProductsParams,
) : QueryOptions<IGetProductsRes> => {
  const {search, ...restParams} = params;
  return {
    queryKey: productsQueryKey.list(restParams),
    queryFn: async ({signal}) => {
        const res = await agent.getProducts(restParams, {
          signal,
        });
        return res.data;
    },
  };
};
