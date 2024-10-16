import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ProductCard from '../ProductCard/ProductCard.tsx';
import {Product} from '../../models/Product.ts';
import {nh, nw} from '../../../normalize.helper.ts';

type ProductsListProps = {
  items?: Product[];
  wishlists?: Record<string, number>;
  layout?: React.ReactElement;
};

const ProductsList = (props: ProductsListProps) => {
  return (
    <FlatList
      ListHeaderComponent={props.layout}
      data={props.items}
      renderItem={({item}) => (
        <ProductCard wishlists={props.wishlists} product={item} />
      )}
      contentContainerStyle={styles.grid}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    display: 'flex',
    paddingBottom: nh(120),
    width: nw(365),
    alignItems: 'center',
  },
});

export default ProductsList;
