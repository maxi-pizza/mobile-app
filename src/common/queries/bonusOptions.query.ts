import {agent} from '../../../APIClient.tsx';

export const bonusOptionsQuery = {
  queryKey: ['bonusOptions'],
  queryFn: async () => {
    const res = await agent.getBonusOptions();
    return res.data;
  },
};
