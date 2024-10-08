import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';


import Banner from '../../../../components/Banner/Banner.tsx';
import Category from '../../../../components/Category/Category.tsx';
import ProductsList from '../../../../components/ProductsList/ProductsList.tsx';
import Search from '../../../../components/Search/Search.tsx';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import { productsQuery} from '../../products.query.ts';

import {DEFAULT_PRODUCT_LIMIT} from '../../products.query.ts';
import {Product} from '../../../../models/Product.ts';
import {categoriesQuery} from '../../../Category/categories.query.ts';
import {IProduct} from '@layerok/emojisushi-js-sdk';

const HomeScreen = ({ route}: { route: any}) => {
  const categorySlug = 'roli';

  const {data: categoryQueryRes, isLoading: isCategoryLoading} = useQuery({
    ...categoriesQuery(),
  });

  const { data: productQueryRes, isLoading: isProductsLoading} = useQuery(
      productsQuery({
        category_slug: 'menu',
        limit: DEFAULT_PRODUCT_LIMIT,
  })
  );
  const belongsToCategory = (product: IProduct) => {
    return !!product.categories.find((category) => category.slug === categorySlug);
  };

  const categoryItems = (productQueryRes?.data || []).filter(belongsToCategory);

  const items = categoryItems.map((item) => new Product(item));

  const selectedCategory = (categoryQueryRes?.data || []).find((category) => {
    return category.slug === categorySlug;
  });

  return (
      <View style={styles.container}>
        <Header route={route}/>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Banner/>
          <Category/>
          <View style={styles.searchWrapper}>
            <Search/>
          </View>
          <View style={styles.productsWrapper}>
            <Text style={styles.product}>{selectedCategory?.name}</Text>
            <ProductsList items={items}/>
          </View>
        </ScrollView>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
    width: '100%',
  },
  scrollContent: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: nh(20),
  },
  product: {
    fontFamily: 'MontserratRegular',
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    marginBottom: nh(15),
    width: nw(365),
  },
  searchWrapper:{
    marginBottom: nh(15),
  },
  productsWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: nw(365),
  },
});

export default HomeScreen;
