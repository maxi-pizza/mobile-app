import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {nh, nw} from '~/common/normalize.helper.ts';
import {ProductCartCard, Header, isClosed} from '~/components';
import { useQuery} from '@tanstack/react-query';
import {
  dataQuery,
} from '~/queries/data.query.ts';

import {cartQuery} from '~/queries/cart.query.ts';
import {appConfig} from '~/config/app.ts';
import {observer} from 'mobx-react-lite';

const CartScreen = observer(({navigation}: {navigation: any}) => {
  const {data: cartItems} = useQuery(cartQuery());

  const {data: catalogQueryData} = useQuery(
    dataQuery(),
  );

  const closed = isClosed({
    start: appConfig.workingHours[0],
    end: appConfig.workingHours[1],
  });

  const ids = Object.keys(cartItems || {});

  const cartProducts = (catalogQueryData?.categories || []).flatMap(category => category.products).filter(item =>
    ids.includes(String(item.id)),
  );

  const sum = ids.reduce((acc, id) => {
    return acc + cartItems?.[id]?.price * cartItems?.[id].count;
  }, 0);

  return (
    <View style={styles.container}>
      <Header />
      {ids.length > 0 ? (
        <View>
          <Text style={[styles.cartTitle, styles.titleMargin]}>Кошик</Text>
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

          <TouchableOpacity
            disabled={closed}
            onPress={() => navigation.navigate('Checkout')}
            style={[
              styles.orderButton,
              closed ? {backgroundColor: 'grey'} : '',
            ]}>
            <Text style={styles.checkoutText}>
              Оформити замовлення | {sum} ₴
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Image style={{
            width: nw(200),
            height: nw(200),
          }} source={require('~/assets/Icons/Sushi.png')}/>
          <Text style={styles.emptyCartText}>Ваш кошик порожній :(</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  cartTitle: {
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nh(20),
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
    color: '#727272',
    fontSize: nh(16),
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
  },
  productsWrapper: {
    marginLeft: nw(13),
  },
  orderButton: {
    backgroundColor: 'rgb(225, 43, 23)',
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
    fontSize: nh(14),
    lineHeight: 17,
    color: 'white',
  },
});

export default CartScreen;
