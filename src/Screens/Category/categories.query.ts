import {IGetCategoriesParams, IGetCategoriesRes} from '@layerok/emojisushi-js-sdk';
import {QueryOptions} from '@tanstack/react-query';
import {agent} from '../../../APIClient.tsx';


export const  categoriesQuery = (
    params: IGetCategoriesParams = {}
) : QueryOptions<IGetCategoriesRes> => ({
  queryKey: ['categories', 'list', params],
  queryFn: async () => {
    const res = await agent.getCategories(params);
    return res.data;
  },
});
