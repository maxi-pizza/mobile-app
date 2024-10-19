import {agent} from '../../../APIClient.tsx';

export const spotsQuery = {
  queryKey: ['spots'],
  queryFn: async () => {
    const res = await agent.getSpots();
    return res.data;
  },
};
