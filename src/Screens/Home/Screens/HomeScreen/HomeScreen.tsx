import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Pressable} from "react-native-gesture-handler";
import {nh, nw} from '~/common/normalize.helper.ts';

import {Header, Category, Banner, Search, ProductCard} from '~/components';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
  dataQuery,
} from '~/queries/data.query.ts';
import {wishlistQuery} from '~/queries/wishlist.query.ts';
import {observer} from 'mobx-react-lite';
import store from '~/stores/store.ts';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  cartQuery,
  removeOldProducts,
} from '~/queries/cart.query.ts';

const HomeScreen = observer(({navigation}: {navigation: any}) => {
  const queryClient = useQueryClient();
  store.changeNavigation(navigation);
  const {data: wishlists, isLoading: isWishlistLoading} = useQuery(
    wishlistQuery(),
  );

  const {data: cartQueryRes} = useQuery(cartQuery());

  const {data: catalogQueryData, isLoading: isProductsLoading} = useQuery(
    dataQuery(),
  );
  const banners = (catalogQueryData?.banners || []).map(banner => banner);

  const cartIds = Object.keys(cartQueryRes || {});
  const {mutate: removeOldProductsMutation} = useMutation({
    mutationFn: ({ids}: {ids: string[];}) =>
      removeOldProducts({ids}),
    onSuccess: () =>
      queryClient.invalidateQueries(cartQuery()),
  });

  useEffect(() => {
    if (cartIds.length > 0) {
      const existProductsIds = (catalogQueryData?.categories || []).flatMap(category =>
        category.products.map(product => String(product.id),)
      );

      const notExistProducts = cartIds.filter(
        cartId => !existProductsIds.includes(cartId),
      );
      if (notExistProducts.length > 0) {
        removeOldProductsMutation({ids: notExistProducts});
      }
    }
  }, [catalogQueryData, cartIds, removeOldProductsMutation]);

  const selectedCategory = (catalogQueryData?.categories || []).find(category => {
    return category.slug === store.categorySlug;
  });

  const items = selectedCategory?.products || [];

  const isLoading = isWishlistLoading || isProductsLoading;
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    try {
      await queryClient.refetchQueries();
    } finally {
      setRefreshing(false);
    }
  }, [queryClient]);

  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading || refreshing}
        textContent={'Loading...'}
        textStyle={{color: 'white'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Header />
      <View style={styles.productsWrapper}>
        <FlatList
          // stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View style={{
              backgroundColor:  '#141414',
            }}>
              {banners.length > 0 && <Banner  />}
              <View style={styles.searchWrapper}>
                <Pressable style={{
                  width: nw(365),
                  height: nh(40),
                }} onPress={() => navigation.navigate('SearchModal')}>
                  <Search onSearch={() => ''} editable={false} />
                </Pressable>
              </View>
              <Category />
              <Text style={styles.product}>{selectedCategory?.name}</Text>
            </View>
          }
          data={items}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <ProductCard
              navigation={navigation}
              wishlists={wishlists}
              product={item}
            />
          )}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
    fontSize: nh(20),
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
