import AsyncStorage from '@react-native-async-storage/async-storage';

export const WISHLIST_STORAGE_KEY = 'wishlist';

export const wishlistQuery = (city: string) => {
  return {
    queryKey: [WISHLIST_STORAGE_KEY, city],
    queryFn: () => getWishlist(city),
  };
};

export const getWishlist = async (
  city: string,
): Promise<Record<string, number>> => {
  const stored = await AsyncStorage.getItem(WISHLIST_STORAGE_KEY + `_${city}`);
  return stored ? JSON.parse(stored) : {};
};

export const addToWishlist = async (id: number, city: string) => {
  const currentWishlist = await getWishlist(city);
  if (Object.keys(currentWishlist).includes(String(id))) {
    const {[id]: _, ...remainingWishlist} = currentWishlist;
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY + `_${city}`,
      JSON.stringify(remainingWishlist),
    );
  } else {
    const updatedWishlist = {...currentWishlist, [id]: id};
    await AsyncStorage.setItem(
      WISHLIST_STORAGE_KEY + `_${city}`,
      JSON.stringify(updatedWishlist),
    );
  }
  return getWishlist(city);
};
