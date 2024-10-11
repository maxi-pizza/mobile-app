import {useMutation, useQueryClient} from '@tanstack/react-query';
import {agent} from '../../../APIClient.tsx';
import {wishlistQuery} from '../../Screens/Favourite/wishlist.query.ts';
import {addProductToWishlistUpdater} from '../queryDataUpdater.ts';

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
                   product_id,
                   quantity,
                 }: {
      product_id: number;
      quantity: number;
    }) => {
      return agent.addWishlistItem({
        product_id,
        quantity,
      });
    },
    onMutate: ({ product_id, quantity }) => {
      queryClient.cancelQueries(wishlistQuery);
      queryClient.setQueryData(
          wishlistQuery.queryKey,
          addProductToWishlistUpdater({ product_id, quantity }),
      );
    },
    onError: () => {
      queryClient.fetchQuery(wishlistQuery.queryKey);
    },
  });
};
