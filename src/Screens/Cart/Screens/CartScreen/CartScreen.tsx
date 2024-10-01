import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import EmptyCart from '../../../../assets/Icons/EmptyCart.svg';
import {nh, nw} from '../../../../../normalize.helper.ts';
import ProductCartCard from '../../../../components/ProductCartCard/ProductCartCard.tsx';
import ForkKnife from '../../../../assets/Icons/ForkKnife.svg';
import Counter from '../../../../components/Counter/Counter.tsx';
import Header from '../../../../components/Header/Header.tsx';

const CartScreen = ({navigation, route}: {navigation: any, route: any}) => {
  const rds = [
      'fsdfsd',
      'fsdfsrd',
  ];

  return (
      <View style={styles.container}>
        <Header route={route} />
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
            <View style={styles.counterWrapper}>
              <Counter/>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Checkout')} style={styles.orderButton}>
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
  counterWrapper: {
    marginLeft: nw(25),
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
  forkKnife: {
    marginLeft: nw(15),
  },
  personText: {
    marginLeft: nw(15),
    color: 'white',
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    lineHeight: 17,
    fontWeight: '400',
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
