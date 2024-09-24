import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';


import Banner from '../../../../components/Banner/Banner.tsx';
import Category from '../../../../components/Category/Category.tsx';
import ProductsGrid from '../../../../components/ProductsGrid/ProductsGrid.tsx';
import Search from '../../../../components/Search/Search.tsx';

const HomeScreen = () => {
  return (
      <ScrollView style={styles.container}>
        <Banner/>
        <Category/>
        <Search/>
        <Text style={styles.product}>Товары</Text>
        <ProductsGrid/>
      </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  product: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    marginLeft: nw(13),
    marginBottom: nh(15),
  },
});

export default HomeScreen;
