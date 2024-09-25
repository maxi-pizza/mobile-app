import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import CartProduct from '../../assets/CartProduct.png';
import Plus from '../../assets/Icons/Plus.svg';
import Minus from '../../assets/Icons/Minus.svg';
import Trash from '../../assets/Icons/Trash.svg';

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonMinus}>
            <Minus color="white" width="16" height="16"/>
          </TouchableOpacity>
          <View style={styles.textWrapper}>
            <Text style={styles.countText}>2</Text>
          </View>
          <TouchableOpacity style={styles.buttonPlus}>
            <Plus color="white" width="16" height="16"/>
          </TouchableOpacity>
        </View>
        <Trash color="#CD3838" style={styles.trash}/>

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
  buttonMinus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: nw(111),
    justifyContent: 'space-between',
    marginLeft: nw(10),
    marginTop: nh(15),
  },
  countText: {
    fontWeight: '600',
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    lineHeight: 22,
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
