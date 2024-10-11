import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ProductsList from '../../../../components/ProductsList/ProductsList.tsx';
import {nh, nw} from '../../../../../normalize.helper.ts';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {wishlistQuery} from '../../wishlist.query.ts';
import {Product} from '../../../../models/Product.ts';
import {DEFAULT_PRODUCT_LIMIT, productsQuery} from '../../../Home/products.query.ts';
import {categoriesQuery} from '../../../Category/categories.query.ts';


const FavouriteScreen = ({ route}: { route: any}) => {
  const { data: wishlists, isLoading: isWishlistLoading} = useQuery(wishlistQuery);
  const {data: categoryQueryRes, isLoading: isCategoryLoading} = useQuery({
    ...categoriesQuery(),
  });

  const { data: productQueryRes, isLoading: isProductsLoading} = useQuery(
      productsQuery({
        category_slug: 'menu',
        limit: DEFAULT_PRODUCT_LIMIT,
      })
  );

  const items = (productQueryRes?.data || [])
      .map((product) => new Product(product))
      .filter((product) => wishlists && product.isInWishlists(wishlists));

   return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.containerScroll} showsVerticalScrollIndicator={false}>
          <Header route={route}/>
          <Text style={styles.text}>Вибране</Text>
          <ProductsList wishlists={wishlists} items={items}/>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  containerScroll: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nw(20),
    lineHeight: nw(24),
    marginBottom: nh(15),
    marginTop: nh(30),
    width: nw(365),
  },
});

export default FavouriteScreen;
