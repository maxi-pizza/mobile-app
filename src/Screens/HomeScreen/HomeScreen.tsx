import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Banner from '../../components/Banner/Banner.tsx';
import Category from '../../components/Category/Category.tsx';
import ProductCard from '../../components/ProductCard/ProductCard.tsx';
import {nh, nw} from "../../../normalize.helper.ts";

const HomeScreen = () => {
  return (
      <View style={styles.container}>
        <Banner/>
        <Category/>
        <Text style={styles.product}>Бестселлеры</Text>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>

      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  product: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    marginLeft: nw(13),
    marginBottom: nh(15),
  },
});

export default HomeScreen;
