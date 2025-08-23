import AsyncStorage from '@react-native-async-storage/async-storage';


export const CART_STORAGE_KEY = 'cart';

export const cartQuery = () => {
  return {
    queryKey: [CART_STORAGE_KEY],
    queryFn: () => getItems(),
  };
};

export const getItems = async (): Promise<Record<string, any>> => {
  const stored = await AsyncStorage.getItem(CART_STORAGE_KEY );
  return stored ? JSON.parse(stored) : {};
};

export const addItem = async (
  id: number,
  count: number,
  price: number,
) => {
  const currentCart = await getItems();
  if (count === 0) {
    const {[id]: _, ...remainingCart} = currentCart;
    await AsyncStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(remainingCart),
    );
  } else {
    const updatedCart = {...currentCart, [id]: {count: count, price: price}};
    await AsyncStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(updatedCart),
    );
  }

  return await getItems();
};

export const removeOldProducts = async ({
  ids,
}: {
  ids: string[];
}) => {
  const cart = await getItems();
  ids.forEach(id => delete cart[id]);
  await AsyncStorage.setItem(
    CART_STORAGE_KEY ,
    JSON.stringify(cart),
  );
};

export const clearCart = async () => {
  await AsyncStorage.removeItem(CART_STORAGE_KEY,);
};

