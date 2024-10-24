import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import EmptyCart from '../../../../assets/Icons/EmptyCart.svg';
import {nh, nw} from '../../../../../normalize.helper.ts';
import ProductCartCard from '../../../../components/ProductCartCard/ProductCartCard.tsx';
import ForkKnife from '../../../../assets/Icons/ForkKnife.svg';
import Counter from '../../../../components/Counter/Counter.tsx';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {
  DEFAULT_PRODUCT_LIMIT,
  productsQuery,
} from '../../../Home/products.query.ts';
import {Product} from '../../../../models/Product.ts';
import {cartQuery} from '../../cart.query.ts';

const CartScreen = ({navigation}: {navigation: any}) => {
  const [personCount, setPersonCount] = useState(0);

  const {data: cartItems} = useQuery(cartQuery);

  const {data: productQueryRes, isLoading: isProductsLoading} = useQuery(
    productsQuery({
      category_slug: 'menu',
      limit: DEFAULT_PRODUCT_LIMIT,
    }),
  );

  const ids = Object.keys(cartItems || {});
  const cart = (productQueryRes?.data || []).filter(item =>
    ids.includes(String(item.id)),
  );
  const cartProducts = cart.map(product => new Product(product));

  const sum = ids.reduce((acc, id) => {
    return acc + cartItems?.[id]?.price * cartItems?.[id].count;
  }, 0);

  return (
    <View style={styles.container}>
      <Header />
      {ids.length > 0 ? (
        <View>
          <Text style={[styles.cartTitle, styles.titleMargin]}>Корзина</Text>
          <View
            style={[
              styles.productsWrapper,
              {height: ids.length === 1 ? nh(155) : nh(330)},
            ]}>
            <ScrollView>
              {cartProducts.map(item => (
                <View key={item.id}>
                  <ProductCartCard item={item} />
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.personCountWrapper}>
            <ForkKnife style={styles.forkKnife} color="white" />
            <Text style={styles.personText}>Количество персон?</Text>
            <View style={styles.counterWrapper}>
              <Counter
                count={personCount}
                onHandleAdd={() => setPersonCount(personCount + 1)}
                onHandleMinus={() =>
                  setPersonCount(Math.max(personCount - 1, 0))
                }
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Checkout')}
            style={styles.orderButton}>
            <Text style={styles.checkoutText}>Оформить заказ | {sum} ₴</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <EmptyCart />
          <Text style={styles.emptyCartText}>Ваша корзина пуста :(</Text>
        </View>
      )}
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
    color: '#727272',
    fontSize: 16,
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
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
