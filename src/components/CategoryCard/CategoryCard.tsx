import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {nw, nh} from '../../../normalize.helper.ts';
import categorySrc from '../../assets/categories/sushi.png';

export const CategoryCard = () => {
  return (
    <View style={cardStyles.container}>
      <Image style={cardStyles.image} source={categorySrc} />
      <Text style={cardStyles.text}>Роли</Text>
    </View>
  );
};


const cardStyles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1C',
    width: nw(165),
    height: nh(70),
    borderRadius: nw(10),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: nw(10),
    marginRight: nw(15),
    marginBottom: nh(15),
  },
  image: {
    width: nw(40),
    height: nw(40),
  },
  text: {
    fontFamily: 'MontserratRegular',
    color: 'white',
    paddingLeft: nw(15),
    fontSize: nh(13),
    fontWeight: '400',
  },
});
