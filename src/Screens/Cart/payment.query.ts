import {agent} from '../../../APIClient.tsx';

export const paymentQuery = {
  queryKey: ['payment', 'list', 'all'],
  queryFn: async () => {
    const res = await agent.getPaymentMethods();
    return res.data;
  },
};
