import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Trash from '~/assets/Icons/Trash.svg';

import {Counter} from '~/components';


import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  addItem,
  CART_STORAGE_KEY,
  cartQuery,
} from '~/queries/cart.query.ts';

import {observer} from 'mobx-react-lite';
import {IProduct} from "~/api";
import {STORAGE_URL} from "~/constants.ts";

export const ProductCartCard = observer(({item}: {item: IProduct}) => {
  const queryClient = useQueryClient();

  const {data: cart} = useQuery(cartQuery());
  const count = cart?.[item.id]?.count || 0;
  const storagePrice = +(item?.price || 0);

  const {mutate} = useMutation({
    mutationFn: ({count, price}: {count: number; price: number}) =>
      addItem(item.id, count, price),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [CART_STORAGE_KEY]});
    },
  });
  const handleAdd = () => {
    mutate({count: count + 1, price: storagePrice ? storagePrice : 0});
  };
  const handleMinus = () => {
    mutate({
      count: Math.max(count - 1, 0),
      price: storagePrice ? storagePrice : 0,
    });
  };
  const handleRemove = () => {
    mutate({
      count: 0,
      price: storagePrice ? storagePrice : 0,
    });
  };

  const price = item?.price + " грн.";
  const discountPrice = undefined;
  return (
    <View style={styles.container}>
      <View style={styles.imageTitleContainer}>
        {item.images.length > 0 ? (
          <Image style={styles.image} source={{uri: STORAGE_URL + '/' + item.images[0].full}} />
        ) : item.image ? (
          <Image style={styles.image} source={{uri: item.image}} />
        ) : (
          <Image style={styles.image} source={require('~/assets/Logo.png')} />
        )}
        <View style={styles.titleDescriptionContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
      <Pressable onPress={handleRemove} style={styles.trash}>
        <Trash color="#CD3838" />
      </Pressable>
      <View style={styles.counterWrapper}>
        <Counter
          count={count}
          onHandleMinus={handleMinus}
          onHandleAdd={handleAdd}
        />
      </View>
      <View style={styles.priceWrapper}>
        <Text style={styles.regularPrice}>{discountPrice ? price : ''}</Text>
        <Text style={styles.discountPrice}>
          {discountPrice ? discountPrice : price}
        </Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: nw(365),
    height: nh(140),
    borderRadius: 10,
    backgroundColor: '#1C1C1C',
    position: 'relative',
    marginBottom: nh(15),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(14),
    lineHeight: 17,
    width: nw(190),
    height: nh(17),
    overflow: 'hidden',
  },
  svg: {
    width: nw(94),
    height: nh(60),
    marginLeft: nw(10),
    marginTop: nh(15),
  },
  counterWrapper: {
    marginTop: nh(15),
    marginLeft: nw(10),
  },
  description: {
    color: '#838383',
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(12),
    lineHeight: 14,
    width: nw(190),
    height: nh(17),
    overflow: 'hidden',
    marginTop: nh(5),
  },
  image: {
    marginLeft: nw(10),
    marginTop: nh(15),
    width: nw(94),
    height: nh(60),
    objectFit: 'contain',
  },
  imageTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  titleDescriptionContainer: {
    marginTop: nh(15),
    marginLeft: nw(10),
  },
  trash: {
    position: 'absolute',
    right: 0,
    marginTop: nh(15),
    marginRight: nw(10),
  },
  discountPrice: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '600',
    lineHeight: 17,
    color: 'white',
  },
  regularPrice: {
    fontSize: nh(10),
    color: '#727272',
    fontWeight: '600',
    lineHeight: 12,
    marginLeft: nw(5),
    textDecorationLine: 'line-through',
  },
  priceWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    marginRight: nw(10),
    marginBottom: nh(17),
  },
  personCountWrapper: {
    backgroundColor: '#1C1C1C',
    width: nw(365),
    height: nh(65),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
  },
});
