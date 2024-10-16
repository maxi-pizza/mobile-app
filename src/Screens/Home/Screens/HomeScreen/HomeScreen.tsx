import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';
import Banner from '../../../../components/Banner/Banner.tsx';
import Category from '../../../../components/Category/Category.tsx';
import ProductsList from '../../../../components/ProductsList/ProductsList.tsx';
import Search from '../../../../components/Search/Search.tsx';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {productsQuery} from '../../products.query.ts';
import {DEFAULT_PRODUCT_LIMIT} from '../../products.query.ts';
import {Product} from '../../../../models/Product.ts';
import {categoriesQuery} from '../../../Category/categories.query.ts';
import {IProduct} from '@layerok/emojisushi-js-sdk';
import {wishlistQuery} from '../../../Favourite/wishlist.query.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route}: {route: any}) => {
  const [categorySlug, setCategorySlug] = useState('premium-roli');

  const {data: wishlists, isLoading: isWishlistLoading} =
    useQuery(wishlistQuery);

  console.log(wishlists);
  const {data: categoryQueryRes, isLoading: isCategoryLoading} = useQuery({
    ...categoriesQuery(),
  });

  const {data: productQueryRes, isLoading: isProductsLoading} = useQuery(
    productsQuery({
      category_slug: 'menu',
      limit: DEFAULT_PRODUCT_LIMIT,
    }),
  );
  const belongsToCategory = (product: IProduct) => {
    return !!product.categories.find(
      category => category.slug === categorySlug,
    );
  };

  const categoryItems = (productQueryRes?.data || []).filter(belongsToCategory);

  const items = categoryItems.map(item => new Product(item));

  const selectedCategory = (categoryQueryRes?.data || []).find(category => {
    return category.slug === categorySlug;
  });

  return (
    <View style={styles.container}>
      <Header route={route} />
      <View style={styles.productsWrapper}>
        <ProductsList
          layout={
            <View>
              <Banner />
              <Category
                selectedCategory={selectedCategory}
                setCategorySlug={setCategorySlug}
              />
              <View style={styles.searchWrapper}>
                <Search />
              </View>
              <Text style={styles.product}>{selectedCategory?.name}</Text>
            </View>
          }
          wishlists={wishlists}
          items={items}
        />
      </View>
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
  searchWrapper: {
    marginBottom: nh(15),
  },
  productsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default HomeScreen;
