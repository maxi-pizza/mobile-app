import React from 'react';

import CartIcon from '~/assets/Icons/Cart.svg';
import {StyleSheet, Text, View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {cartQuery} from '~/Screens/Cart/cart.query.ts';
import {nh, nw} from '~/common/normalize.helper.ts';
import store from '~/stores/store.ts';
import {observer} from 'mobx-react-lite';

const CartBottomTab = observer(({focused}: {focused: any}) => {
  const {data: cart} = useQuery(cartQuery(store.city));

  const ids = Object.keys(cart || {});
  const count = ids.reduce((acc, id) => {
    return acc + cart?.[id].count;
  }, 0);

  return (
    <View>
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
      <CartIcon width={26} color={focused ? 'yellow' : 'white'} />
    </View>
  );
});

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    left: 15,
    top: 15,
    backgroundColor: 'yellow',
    width: nw(17),
    height: nw(17),
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  badgeText: {
    color: 'black',
    fontFamily: 'MontserratRegular',
    fontWeight: '700',
    fontSize: nh(12),
    lineHeight: 14,
  },
});

export default CartBottomTab;
