import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import EmptyCart from '../../../../assets/Icons/EmptyCart.svg';
import {nh, nw} from '../../../../../normalize.helper.ts';
import ProductCartCard from '../../../../components/ProductCartCard/ProductCartCard.tsx';
import Minus from '../../../../assets/Icons/Minus.svg';
import Plus from '../../../../assets/Icons/Plus.svg';
import ForkKnife from '../../../../assets/Icons/ForkKnife.svg';

const CartScreen = () => {
  return (
      <View style={styles.container}>
        {/*<View style={styles.emptyCart}>*/}
        {/*    <EmptyCart/>*/}
        {/*    <Text style={styles.emptyCartText}>Ваша корзина пуста :(</Text>*/}
        {/*  </View>*/}

        <View>
          <Text style={[styles.cartTitle, styles.titleMargin]}>Корзина</Text>
          <View style={styles.productsWrapper}>
            <ProductCartCard/>
            <ProductCartCard/>
          </View>

          <View style={styles.personCountWrapper}>
            <ForkKnife style={styles.forkKnife} color="white"/>
            <Text style={styles.personText}>Количество персон?</Text>
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
          </View>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.checkoutText}>Оформить заказ | 15 906 ₴</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  cartTitle: {
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
  },
  titleMargin: {
    marginTop: nh(30),
    marginLeft: nw(13),
    marginBottom: nh(15),
  },
  emptyCart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  emptyCartText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: 'white',
  },
  productsWrapper: {
    marginLeft: nw(13),
  },

  personCountWrapper: {
    backgroundColor: '#1C1C1C',
    width: nw(365),
    height: nh(65),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginLeft: nw(13),
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
    borderRadius: 35,
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
    position: 'absolute',
    right: 10,
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
  forkKnife: {
    marginLeft: nw(15),
  },
  personText: {
    marginLeft: nw(15),
  },
  orderButton: {
    backgroundColor: '#FFE600',
    width: nw(365),
    height: nh(50),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: nh(15),
    marginLeft: nw(13),
  },
  checkoutText: {
    fontFamily: 'Montserrat',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: 'black',
  },
});

export default CartScreen;
