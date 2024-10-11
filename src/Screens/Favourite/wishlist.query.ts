import {agent} from '../../../APIClient.tsx';


export const wishlistQuery = {
  queryKey: ['wishlists', 'list', 'all'],
  queryFn: async () => {
    const res = await agent.getWishlists();
    return res.data;
  },
};
