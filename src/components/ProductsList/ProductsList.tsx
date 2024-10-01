import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProductCard from '../ProductCard/ProductCard.tsx';


const ProductsList = () => {
  return (
      <View style={styles.grid}>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
        <ProductCard/>
      </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
  },
});

export default ProductsList;
