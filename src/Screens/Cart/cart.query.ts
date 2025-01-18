import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from '@tanstack/react-query';
import store from '~/stores/store.ts';

export const CART_STORAGE_KEY = 'cart';

export const cartQuery = (slug: string) => {
  return {
    queryKey: [CART_STORAGE_KEY, slug],
    queryFn: () => getItems(slug),
  };
};

export const getItems = async (city: string): Promise<Record<string, any>> => {
  const stored = await AsyncStorage.getItem(CART_STORAGE_KEY + `_${city}`);
  return stored ? JSON.parse(stored) : {};
};

export const addItem = async (
  id: number,
  count: number,
  price: number,
  city: string,
) => {
  const currentCart = await getItems(city);
  if (count === 0) {
    const {[id]: _, ...remainingCart} = currentCart;
    await AsyncStorage.setItem(
      CART_STORAGE_KEY + `_${city}`,
      JSON.stringify(remainingCart),
    );
  } else {
    const updatedCart = {...currentCart, [id]: {count: count, price: price}};
    await AsyncStorage.setItem(
      CART_STORAGE_KEY + `_${city}`,
      JSON.stringify(updatedCart),
    );
  }

  return await getItems(city);
};

export const removeOldProducts = async ({
  ids,
  city,
}: {
  ids: string[];
  city: string;
}) => {
  const cart = await getItems(city);
  ids.forEach(id => delete cart[id]);
  await AsyncStorage.setItem(
    CART_STORAGE_KEY + `_${city}`,
    JSON.stringify(cart),
  );
};
