import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ProductsList from '../../../../components/ProductsList/ProductsList.tsx';
import {nh, nw} from '../../../../../normalize.helper.ts';
import Header from '../../../../components/Header/Header.tsx';


const FavouriteScreen = ({ route}: { route: any}) => {
  return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header route={route}/>
          <Text style={styles.text}>Вибране</Text>
          <ProductsList/>
        </ScrollView>
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
