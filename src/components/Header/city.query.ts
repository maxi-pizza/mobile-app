import {agent} from '../../../APIClient.tsx';

export const cityQuery = {
  queryKey: ['cities'],
  queryFn: async () => {
    const res = await agent.getCities({
      includeSpots: false,
      includeDistricts: false,
    });
    return res.data;
  },
};
