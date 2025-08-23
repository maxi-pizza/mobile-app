import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import {Counter} from '~/components';
import Heart from '../../assets/Icons/Heart.svg';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  addItem,
  CART_STORAGE_KEY,
  cartQuery,
} from '~/queries/cart.query.ts';
import {
  addToWishlist,
  WISHLIST_STORAGE_KEY,
} from '~/queries/wishlist.query.ts';

import {observer} from 'mobx-react-lite';
import {IProduct} from "~/api";
import {STORAGE_URL} from "~/env.ts";

export const ProductCard = observer(
  ({
    product,
    wishlists,
    navigation,
  }: {
    product: IProduct;
    wishlists?: Record<string, number>;
    navigation: any;
  }) => {
    const queryClient = useQueryClient();

    const {data: cart} = useQuery(cartQuery());
    const count = cart?.[product.id]?.count || 0;
    const {mutate: cartMutation} = useMutation({
      mutationFn: ({count, price}: {count: number; price: number}) =>
        addItem(product.id, count, price),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CART_STORAGE_KEY],
        });
      },
    });
    const wishIds = Object.keys(wishlists || {});

    const favourite = wishIds.includes(String(product.id));
    const {mutate: addWishlist} = useMutation({
      mutationFn: ({id}: {id: number}) => addToWishlist(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [WISHLIST_STORAGE_KEY],
        });
      },
    });
    const price = product?.price + " грн.";
    const discountPrice = undefined;

    const storagePrice = +(product?.price ?? 0);
    const onHandleAdd = () => {
      cartMutation({
        count: count + 1,
        price: storagePrice ? storagePrice : 0,
      });
    };
    const onHandleMinus = () => {
      cartMutation({
        count: Math.max(count - 1, 0),
        price: storagePrice ? storagePrice : 0,
      });
    };

    const handleFavouriteButton = () => {
      addWishlist({
        id: product.id,
      });
    };
    const descriptionThreeWords = (str: string | null) => {
      if (str === '' || str === null) {
        return false;
      }
      const words: string[] = str.split(',').map(word => word.trim());
      let result: string[] = words.slice(0, 4);
      if (words.length > 4) {
        return result.join(', ') + '...';
      }
      return result.join(', ');
    };
    return (
      <View style={styles.wrapper}>
        <Text style={styles.weight}>{product.weight} г</Text>
        <Pressable
          onPress={() =>
            navigation.navigate('ProductModal', {
              product: product.id,
            })
          }>
          <Pressable
            onPress={handleFavouriteButton}
            style={styles.heartContainer}>
            <Heart
              width="14"
              height="12"
              color={favourite ? 'rgb(225, 43, 23)' : 'white'}
            />
          </Pressable>

          <View style={styles.imageDescriptionWrapper}>
            {product.images.length > 0 ? (
              <Image style={styles.image} source={{uri: STORAGE_URL + '/' + product.images[0].full}} />
            ) : product.image !== null ? (
              <Image style={styles.image} source={{uri: product?.image}} />
            ) : (
              <View style={styles.image}>
                <Image style={styles.svg} source={require('~/assets/Logo.png')} />
              </View>

            )}
            <View style={styles.textWrapper}>
              <Text style={styles.title}>{product.name}</Text>
              <Text style={styles.description}>
                {descriptionThreeWords(product.description)}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.priceAndButtonContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>
              {discountPrice ? price : ''}
            </Text>
            <Text style={styles.price}>
              {discountPrice ? discountPrice : price}
            </Text>
          </View>

          {count > 0 ? (
            <Counter
              onHandleMinus={onHandleMinus}
              onHandleAdd={onHandleAdd}
              count={count}
            />
          ) : (
            <TouchableOpacity onPress={onHandleAdd} style={styles.addBtn}>
              <Text style={styles.btnText}>Додати в кошик</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1C1C1C',
    width: nw(365),
    height: nh(180),
    borderRadius: nw(10),
    position: 'relative',
    marginBottom: nh(15),
    display: 'flex',
  },
  image: {
    width: nw(115),
    height: nh(100),
    marginTop: nh(20),
    marginLeft: nw(15),
    objectFit: 'contain',
  },
  svg: {
    width: nw(81),
    height: nh(60),
    marginTop: nh(40),
    marginLeft: nw(15),
    opacity: 0.1,
  },
  imageDescriptionWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  textWrapper: {
    marginTop: nh(20),
    marginLeft: nw(15),
  },
  weight: {
    position: 'absolute',
    backgroundColor: '#141414CC',
    opacity: 80,
    padding: nw(5),
    borderRadius: 10,
    zIndex: 1,
    marginLeft: nw(5),
    marginTop: nh(5),
    height: nh(25),
    fontSize: nh(12),
    color: 'white',
  },
  heartContainer: {
    width: nw(30),
    height: nh(30),
    position: 'absolute',
    backgroundColor: '#141414CC',
    opacity: 80,
    borderRadius: 20,
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: nh(5),
    left: nw(105),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 17,
    fontSize: nh(14),
    width: nw(200),
  },
  description: {
    fontSize: nh(12),
    fontFamily: 'MontserratRegular',
    fontWeight: '300',
    overflow: 'hidden',
    color: '#838383',
    width: nw(190),
    height: nh(60),
  },
  button: {
    width: nw(35),
    height: nh(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceAndButtonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: nh(17),
    marginLeft: nw(15),
    marginRight: nw(10),
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  price: {
    fontSize: nh(14),
    fontWeight: '600',
    lineHeight: 18,
    color: 'white',
  },
  discountPrice: {
    fontSize: nh(12),
    color: '#727272',
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: nw(5),
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: 'transparent',
    width: nw(120),
    height: nh(35),
    borderRadius: 7,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgb(225, 43, 23)',
    borderWidth: 1,
  },
  btnText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(13),
    fontWeight: '800',
  },
});
