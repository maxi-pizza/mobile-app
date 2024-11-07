import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import OrderCard from './components/OrderCard.tsx';
import {Header} from '../../../../components';

const OrderHistoryScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Text style={styles.header}>Історія замовлень</Text>
        <OrderCard status={true} />
        <OrderCard status={false} />
        <OrderCard status={true} />
        <OrderCard status={true} />
        <OrderCard status={false} />
        <OrderCard status={true} />
        <OrderCard status={false} />
        <OrderCard status={true} />
        <OrderCard status={true} />
        <OrderCard status={false} />
        <OrderCard status={false} />
        <OrderCard status={true} />
        <OrderCard status={false} />
        <OrderCard status={false} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nh(20),
    color: 'white',
    marginTop: nh(30),
    marginBottom: nh(30),
    width: nw(365),
  },
  order: {
    width: nw(365),
    backgroundColor: '#1C1C1C',
  },
});

export default OrderHistoryScreen;
