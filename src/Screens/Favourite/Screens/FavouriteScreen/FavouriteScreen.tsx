import React from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import {Header, ProductCard} from '~/components';
import {useQuery} from '@tanstack/react-query';
import {wishlistQuery} from '~/queries/wishlist.query.ts';

import {
  dataQuery,
} from '~/queries/data.query.ts';

import {observer} from 'mobx-react-lite';

const FavouriteScreen = observer(({navigation}: {navigation: any}) => {
  const {data: wishlists } = useQuery(
    wishlistQuery(),
  );

  const {data: catalogQueryData } = useQuery(
    dataQuery(),
  );
  const idsWishlist = Object.keys(wishlists || {});
  const products = (catalogQueryData?.categories || []).flatMap(category => category.products).filter(item =>
    idsWishlist.includes(String(item.id)),
  );

  return (
    <View style={styles.container}>
      <Header />
      {products.length === 0 ? (
        <View style={styles.noResultContainer}>
          <Image style={{
            height: nw(200),
            width: nw(200),
          }} source={require('~/assets/Icons/Sticks.png')}/>

          <Text style={[styles.noResultText, {marginTop: nh(15)}]}>
            Вибрані товари не знайдено
          </Text>
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={<Text style={styles.text}>Улюблені</Text>}
          data={products}
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
});

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
