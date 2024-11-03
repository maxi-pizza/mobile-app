import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {wishlistQuery} from '../../wishlist.query.ts';
import {Product} from '../../../../models/Product.ts';
import {
  DEFAULT_PRODUCT_LIMIT,
  productsQuery,
} from '../../../Home/products.query.ts';
import ProductCard from '../../../../components/ProductCard/ProductCard.tsx';

import NoResult from '../../../../assets/Icons/NoResultSearch.svg';

const FavouriteScreen = ({navigation}: {navigation: any}) => {
  const {data: wishlists, isLoading: isWishlistLoading} =
    useQuery(wishlistQuery);

  const {data: productQueryRes, isLoading: isProductsLoading} = useQuery(
    productsQuery({
      category_slug: 'menu',
      limit: DEFAULT_PRODUCT_LIMIT,
    }),
  );
  const idsWishlist = Object.keys(wishlists || {});
  const items = (productQueryRes?.data || []).filter(item =>
    idsWishlist.includes(String(item.id)),
  );
  const wishlist = items.map(item => new Product(item));

  return (
    <View style={styles.container}>
      <Header />
      {wishlist.length === 0 ? (
        <View style={styles.noResultContainer}>
          <NoResult height={nh(200)} width={nw(200)} color={'#393939'} />
          <Text style={[styles.noResultText, {marginTop: nh(15)}]}>
            Выбранные товары не найдены
          </Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={<Text style={styles.text}>Вибране</Text>}
          data={wishlist}
          renderItem={({item}) => (
            <ProductCard
              navigation={navigation}
              wishlists={wishlists}
              product={item}
            />
          )}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  grid: {
    display: 'flex',
    paddingBottom: nh(120),
    width: nw(365),
    alignItems: 'center',
  },
  containerScroll: {},
  text: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nh(20),
    lineHeight: nw(24),
    marginBottom: nh(15),
    marginTop: nh(30),
    width: nw(365),
  },
  noResultContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: nh(170),
  },
  noResultText: {
    color: '#727272',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    width: nw(200),
    textAlign: 'center',
  },
});

export default FavouriteScreen;
