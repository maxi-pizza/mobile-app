import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';


import Banner from '../../../../components/Banner/Banner.tsx';
import Category from '../../../../components/Category/Category.tsx';
import ProductsList from '../../../../components/ProductsList/ProductsList.tsx';
import Search from '../../../../components/Search/Search.tsx';
import Header from '../../../../components/Header/Header.tsx';

const HomeScreen = ({ route}: { route: any}) => {
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
            <Text style={styles.product}>Товары</Text>
            <ProductsList/>
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
