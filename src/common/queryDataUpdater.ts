import {IGetWishlistRes} from "@layerok/emojisushi-js-sdk";
import {arrImmutableDeleteAt} from "./utils/arr.utils..ts";

export function addProductToWishlistUpdater(
    {
      product_id,
      quantity,
    }: {
      product_id: number;
      quantity: number;
    }) {
  return function (oldWishlists: IGetWishlistRes | undefined) {
    if(!oldWishlists) {
      return oldWishlists;
    }
    const firstWishlist = oldWishlists[0] || {
      items: [],
      id: 0,
    };

    const wishlistItem = firstWishlist.items.find(
        (item) => item.product_id === product_id
    );

    if (wishlistItem) {
      const index = firstWishlist.items.indexOf(wishlistItem);
      const items = arrImmutableDeleteAt(firstWishlist.items, index);
      return [
        {
          ...firstWishlist,
          items,
        },
        ...oldWishlists.slice(1),
      ];
    } else {
      const firstWishlist = oldWishlists[0] || {
        items: [],
        id: 0,
      };
      const item = {
        product_id: product_id,
        quantity: quantity,
        wishlists_id: firstWishlist.id,
      };

      return [
        {
          ...firstWishlist,
          items: [...firstWishlist.items, item],
        },
        ...oldWishlists.slice(1),
      ];
    }
  };
}
