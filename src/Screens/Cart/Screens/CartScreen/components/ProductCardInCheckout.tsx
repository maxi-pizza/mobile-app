import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import ProductSrc from '~/assets/Product.png';

const ProductCardInCheckout = () => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={ProductSrc} />
        <View style={styles.textWrapper}>
          <Text style={styles.whiteText}>Ролл овощной</Text>
          <Text style={styles.greyText}>Помідор, огурець, авокадо...</Text>
        </View>
        <View style={styles.priceWrapper}>
          <Text style={styles.regularPrice}>9556 ₴</Text>
          <Text style={styles.discountPrice}>7953 ₴</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: nh(365),
    height: nw(90),
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
  },
  wrapper: {
    marginTop: nh(15),
    marginLeft: nw(10),
    marginRight: nw(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: nw(94),
    height: nh(60),
  },
  textWrapper: {
    width: nw(176),
    height: nh(40),
  },
  whiteText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '400',
    lineHeight: 17,
    color: 'white',
  },
  greyText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    fontWeight: '400',
    lineHeight: 14,
    color: '#838383',
  },
  regularPrice: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(10),
    fontWeight: '600',
    lineHeight: 12,
    color: '#727272',
  },
  discountPrice: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '600',
    lineHeight: 17,
    color: 'white',
  },
  priceWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

export default ProductCardInCheckout;
