import {agent} from '../../../APIClient.tsx';

export const cityQuery = {
  queryKey: ['cities'],
  queryFn: async () => {
    const res = await agent.getCities({
      includeSpots: true,
      includeDistricts: true,
    });
    return res.data;
  },
};
