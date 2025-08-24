import React from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header, BackButton, Counter} from '~/components';
import {nh, nw} from '~/common/normalize.helper.ts';

import Heart from '~/assets/Icons/Heart.svg';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  addItem,
  CART_STORAGE_KEY,
  cartQuery,
} from '~/queries/cart.query.ts';
import {
  addToWishlist,
  WISHLIST_STORAGE_KEY,
  wishlistQuery,
} from '~/queries/wishlist.query.ts';


import {observer} from 'mobx-react-lite';
import {
  dataQuery,
} from '~/queries/data.query.ts';
import {IProduct} from '~/api';
import {STORAGE_URL} from '~/constants.ts';

const ProductModal = observer(
  ({route, navigation}: {route: any; navigation: any}) => {
    const {data: catalogQueryData} = useQuery(
      dataQuery(),
    );
    const queryClient = useQueryClient();
    const id = route.params.product || [];
    const item: IProduct | undefined = (catalogQueryData?.categories || []).flatMap(category => category.products).find(
      i => i.id === id,
    );
    if (!item) {
      throw new Error('undefined product');
    }
    const product = item;

    const {data: wishlists} = useQuery(wishlistQuery());

    const {data: cart} = useQuery(cartQuery());
    const {mutate: cartMutation} = useMutation({
      mutationFn: ({count, price}: {count: number; price: number}) =>
        addItem(product.id, count, price),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [CART_STORAGE_KEY],
        });
      },
    });
    const price = product?.price + ' грн.';
    const discountPrice = undefined;

    const count = cart?.[product.id]?.count || 0;

    const storagePrice = +(product?.price || 0);
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
    const {mutate: addWishlist} = useMutation({
      mutationFn: ({id}: {id: number}) => addToWishlist(id),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [WISHLIST_STORAGE_KEY],
        });
      },
    });
    const wishIds = Object.keys(wishlists || {});
    const favourite = wishIds.includes(String(product.id));

    const handleFavouriteButton = () => {
      addWishlist({
        id: product.id,
      });
    };

    return (
      <View>
        <Header  />
        <BackButton navigation={navigation} />
        <View style={styles.container}>
          <View style={styles.productContainer}>
            {product.images.length > 0 ? (
              <Image source={{uri: STORAGE_URL + '/' + product.images[0].full}} style={styles.image} />
            ): product.image ? (
              <Image source={{uri: product.image}} style={styles.image} />
            ) : (
              <Image style={styles.nullImage} source={require('~/assets/Logo.png')} width={nw(265)} height={nh(171)}  />
            )}
            <View style={styles.heartTitleWrapper}>
              <View style={styles.titleWrapper}>
                <Text style={styles.productTitle}>{product.name}</Text>
                <Text style={styles.weightText}>{product.weight}г</Text>
              </View>
              <Pressable
                style={styles.heartBtn}
                onPress={handleFavouriteButton}>
                <Heart width={nw(20)} color={favourite ? 'rgb(225, 43, 23)' : 'white'} />
              </Pressable>
            </View>
            <View
              style={[
                styles.horizontalBar,
                {marginTop: nh(15), marginBottom: nh(15)},
              ]}
            />
            <View style={styles.priceWrapper}>
              <Text style={styles.price}>
                {discountPrice ? discountPrice : price}
              </Text>
              <Text style={styles.discountPrice}>
                {discountPrice ? price : ''}
              </Text>
            </View>
            <View
              style={[
                styles.horizontalBar,
                {marginTop: nh(15), marginBottom: nh(15)},
              ]}
            />
            <Text style={styles.whiteText}>
              {product.description ? '' : 'Інгредієнти'}
            </Text>
            <FlatList
              style={{marginTop: nh(10), height: nh(160)}}
              data={product.description?.split(',')}
              renderItem={ingredient => (
                <View style={styles.dotWrapper}>
                  <View style={styles.dot} />
                  <Text style={styles.ingredientsText}>{ingredient.item}</Text>
                </View>
              )}
              keyExtractor={ingredient => ingredient}
            />
            {count > 0 ? (
              <View style={{marginTop: nh(30)}}>
                <Counter
                  onHandleMinus={onHandleMinus}
                  onHandleAdd={onHandleAdd}
                  count={count}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => onHandleAdd()}>
                <Text style={styles.blackText}>Додати в кошик</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    width: '100%',
    height: '100%',
    paddingTop: nh(30),
  },
  image: {
    width: nw(265),
    height: nh(171),
    objectFit: 'contain',
  },
  nullImage: {
    width: nw(265),
    height: nh(171),
    objectFit: 'contain',
    opacity: 0.2
  },
  productContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  productTitle: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(16),
    color: 'white',
    fontWeight: '500',
  },
  weightText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    color: '#727272',
    fontWeight: '400',
    marginLeft: nw(10),
    lineHeight: 17,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  heartTitleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: nh(34),
    justifyContent: 'space-between',
    width: nw(365),
    alignItems: 'center',
  },
  heartBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 30,
    width: nw(35),
    height: nw(35),
  },
  horizontalBar: {
    width: '100%',
    height: nh(1),
    backgroundColor: '#202020',
  },
  priceWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: nw(365),
  },
  dotWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: nw(15),
  },
  dot: {
    backgroundColor: 'white',
    width: nw(3),
    height: nw(3),
    borderRadius: 10,
  },
  price: {
    fontSize: nh(18),
    fontWeight: '600',
    lineHeight: 18,
    color: 'white',
  },
  discountPrice: {
    fontSize: nh(14),
    color: '#727272',
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: nw(5),
    textDecorationLine: 'line-through',
  },
  whiteText: {
    fontSize: nh(15),
    fontFamily: 'MontserratRegular',
    color: 'white',
    width: nw(365),
  },
  ingredientsText: {
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    color: 'white',
    width: nw(365),
    marginLeft: nw(5),
  },
  addBtn: {
    width: nw(365),
    height: nh(44),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(225, 43, 23)',
    borderRadius: 10,
    marginTop: nh(30),
  },
  blackText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '600',
  },
});

export default ProductModal;
