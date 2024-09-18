import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProductCard from '../ProductCard/ProductCard.tsx';
import {nw} from '../../../normalize.helper.ts';


const ProductsGrid = () => {
  return (
      <View style={styles.grid}>
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
    flexDirection: 'row',
    maxWidth: nw(365 ),
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginLeft: nw(13),
  },
});

export default ProductsGrid;
