import {agent} from '../../../APIClient.tsx';

export const shippingQuery = {
  queryKey: ['shipping', 'list', 'all'],
  queryFn: async () => {
    const res = await agent.getShippingMethods();
    return res.data;
  },
};
