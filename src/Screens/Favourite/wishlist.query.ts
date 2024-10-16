import AsyncStorage from '@react-native-async-storage/async-storage';

export const WISHLIST_STORAGE_KEY = 'wishlist';

export const WISHLIST_QUERY_KEY = ['wishlist'];

export const wishlistQuery = {
  queryKey: WISHLIST_QUERY_KEY,
  queryFn: () => getWishlist(),
};

export const getWishlist = async (): Promise<Record<string, number>> => {
  const stored = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY);
  return stored ? JSON.parse(stored) : {};
};

export const addToWishlist = async (id: number) => {
  const currentWishlist = await getWishlist();
  if (Object.keys(currentWishlist).includes(String(id))) {
    const {[id]: _, ...remainingWishlist} = currentWishlist;
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(remainingWishlist),
    );
  } else {
    const updatedWishlist = {...currentWishlist, [id]: id};
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(updatedWishlist),
    );
  }
  return getWishlist();
};
