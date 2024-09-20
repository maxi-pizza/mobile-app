import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid.tsx";
import {nh, nw} from "../../../normalize.helper.ts";


const FavouriteScreen = () => {
  return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Вибране</Text>
        <ProductsGrid/>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  text: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nw(20),
    lineHeight: nw(24),
    marginLeft: nw(13),
    marginBottom: nh(15),
    marginTop: nh(30),
  },
});

export default FavouriteScreen;
