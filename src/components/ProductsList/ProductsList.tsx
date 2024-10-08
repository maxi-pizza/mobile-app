import React from 'react';
import {StyleSheet, View} from 'react-native';
import ProductCard from '../ProductCard/ProductCard.tsx';
import {Product} from '../../models/Product.ts';


const ProductsList = ({items}: {items: Product[]}) => {

  return (
      <View style={styles.grid}>
        {items.map((item) => (
            <ProductCard key={item.id} product={item}/>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
  },
});

export default ProductsList;
