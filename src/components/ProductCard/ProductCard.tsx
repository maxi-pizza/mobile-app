import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';
import productSrc from '../../assets/Product.png';
import Heart from '../../assets/Icons/Heart.svg';
import Plus from '../../assets/Icons/Plus.svg';

const ProductCard = () => {

  return (
      <View style={styles.wrapper}>
        <Text style={styles.weight}>2285г</Text>
        <View style={styles.heartContainer}>
          <Heart width="14" height="12" color="white"/>
        </View>
        <Image style={styles.image} source={productSrc}/>

        <Text style={styles.title}>Ролл овощной</Text>
        <View style={styles.priceAndButtonContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.discountPrice}>7935</Text>
            <Text style={styles.regularPrice}>9556</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Plus color="white" width="18" height="18"/>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1C1C1C',
    width: nw(175),
    height: nh(197),
    borderRadius: nw(10),
    position: 'relative',
    marginBottom: nh(15),
  },
  image: {
    width: nw(121),
    height: nh(78),
    marginLeft: nw(27),
    marginRight: nw(27),
    marginTop: nh(20),
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
    fontSize: 12,
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
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: nw(5),
    marginTop: nh(5),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    marginLeft: nw(10),
    marginTop: nh(10),
    fontWeight: '400',
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
    marginLeft: nw(10),
    marginRight: nw(10),
  },
  priceContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountPrice: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: 'white',
  },
  regularPrice: {
    fontSize: 12,
    color: '#727272',
    fontWeight: '600',
    lineHeight: 15,
    marginLeft: nw(5),
    textDecorationLine: 'line-through',
  },
});

export default ProductCard;
