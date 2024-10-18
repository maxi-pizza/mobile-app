import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {nw, nh} from '../../../normalize.helper.ts';
import {ICategory} from '@layerok/emojisushi-js-sdk';
import CategoryNullImage from '../../assets/Logo.svg';

import categoryStore from '../../stores/store.ts';

export const CategoryCard = ({category}: {category: ICategory}) => {
  // todo: in category make a function with navigation
  // todo: in categoryScreen we dont need selectedCategory
  // todo: fix bug with navigation

  return (
    <TouchableOpacity
      style={[
        cardStyles.container,
        categoryStore.categorySlug === category.slug ? cardStyles.active : '',
      ]}
      onPress={() => categoryStore.changeCategory(category.slug)}>
      {category.image?.path ? (
        <Image style={cardStyles.image} source={{uri: category?.image?.path}} />
      ) : (
        <CategoryNullImage style={cardStyles.image} fillOpacity={0.2} />
      )}
      <Text style={cardStyles.text}>{category?.name}</Text>
    </TouchableOpacity>
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
  },
  active: {
    backgroundColor: '#171717',
    borderWidth: 1,
    borderColor: '#FFE600',
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
    width: nw(100),
  },
});
