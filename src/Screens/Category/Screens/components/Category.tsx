import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import CategoryNullImage from '~/assets/Logo.svg';
import {ICategory} from '@layerok/emojisushi-js-sdk';

const Category = ({
  category,
  categoryHandle,
}: {
  category: ICategory;
  categoryHandle: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={categoryHandle}>
      {category.image?.path ? (
        <Image style={styles.image} source={{uri: category?.image?.path}} />
      ) : (
        <CategoryNullImage style={styles.image} fillOpacity={0.2} />
      )}
      <Text style={styles.text}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: nw(175),
    height: nh(70),
    backgroundColor: '#1C1C1C',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },
  text: {
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(13),
    lineHeight: 16,
    color: 'white',
    marginLeft: nw(15),
    width: nw(100),
  },
  image: {
    width: nw(40),
    height: nh(40),
    marginLeft: nw(10),
  },
});

export default Category;
