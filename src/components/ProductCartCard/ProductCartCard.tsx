import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import CartProduct from '../../assets/CartProduct.png';
import Trash from '../../assets/Icons/Trash.svg';

import Counter from '../Counter/Counter.tsx';

// todo: make list of products not a grid

const ProductCartCard = () => {
  return (
      <View style={styles.container}>
        <View style={styles.imageTitleContainer}>
          <Image style={styles.image} source={CartProduct}/>
          <View style={styles.titleDescriptionContainer}>
            <Text style={styles.title}>Ролл овощной</Text>
            <Text style={styles.description}>Помідор, огурець, авокадо...</Text>
          </View>
        </View>
        <Trash color="#CD3838" style={styles.trash}/>
        <View style={styles.counterWrapper}>
          <Counter/>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.regularPrice}>9556 ₴</Text>
          <Text style={styles.discountPrice}>7953 ₴</Text>
        </View>

      </View>
  );
};

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
    fontSize: 14,
    lineHeight: 17,
    width: nw(190),
    height: nh(17),
    overflow: 'hidden',
  },
  counterWrapper: {
    marginTop: nh(15),
    marginLeft: nw(10),
  },
  description: {
    color: '#838383',
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    width: nw(190),
    height: nh(17),
    overflow: 'hidden',
    marginTop: nh(5),
  },
  image: {
    marginLeft: nw(10),
    marginTop: nh(15),
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
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    color: 'white',
  },
  regularPrice: {
    fontSize: 10,
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

export default ProductCartCard;
