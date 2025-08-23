import {IGetDataRes} from '~/api';
import {QueryOptions} from '@tanstack/react-query';
import {agent} from '../../APIClient.tsx';

export const dataQuery = () : QueryOptions<IGetDataRes> => {
  return {
    queryKey: ['data'],
    queryFn: async ({signal}) => {
        const res = await agent.getData(undefined, {
          signal,
        });
        return res.data;
    },
  };
};
