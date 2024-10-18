import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';
import Banner from '../../../../components/Banner/Banner.tsx';
import Category from '../../../../components/Category/Category.tsx';
import Search from '../../../../components/Search/Search.tsx';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {productsQuery} from '../../products.query.ts';
import {DEFAULT_PRODUCT_LIMIT} from '../../products.query.ts';
import {Product} from '../../../../models/Product.ts';
import {categoriesQuery} from '../../../Category/categories.query.ts';
import {IProduct} from '@layerok/emojisushi-js-sdk';
import {wishlistQuery} from '../../../Favourite/wishlist.query.ts';
import {observer} from 'mobx-react-lite';
import categoryStore from '../../../../stores/store.ts';
import ProductCard from '../../../../components/ProductCard/ProductCard.tsx';

const HomeScreen = observer(({route}: {route: any}) => {
  const {data: wishlists, isLoading: isWishlistLoading} =
    useQuery(wishlistQuery);

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
      category => category.slug === categoryStore.categorySlug,
    );
  };

  const categoryItems = (productQueryRes?.data || []).filter(belongsToCategory);

  const items = categoryItems.map(item => new Product(item));

  const selectedCategory = (categoryQueryRes?.data || []).find(category => {
    return category.slug === categoryStore.categorySlug;
  });

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.productsWrapper}>
        <FlatList
          ListHeaderComponent={
            <View>
              <Banner />
              <View style={styles.searchWrapper}>
                <Search />
              </View>
              <Category />
              <Text style={styles.product}>{selectedCategory?.name}</Text>
            </View>
          }
          data={items}
          renderItem={({item}) => (
            <ProductCard wishlists={wishlists} product={item} />
          )}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
    width: '100%',
  },
  grid: {
    display: 'flex',
    paddingBottom: nh(120),
    width: nw(365),
    alignItems: 'center',
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
    marginTop: nh(25),
    marginBottom: nh(20),
  },
  productsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default HomeScreen;
