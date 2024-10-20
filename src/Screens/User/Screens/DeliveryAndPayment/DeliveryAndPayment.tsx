import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../../../components/Header/Header.tsx';

const DeliveryAndPayment = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DeliveryAndPayment;
