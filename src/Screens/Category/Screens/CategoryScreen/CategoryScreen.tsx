import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '../../../../components/CategoryCard/CategoryCard.tsx';
import {nh, nw} from '../../../../../normalize.helper.ts';

const CategoryScreen = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.category}>Категории</Text>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer} >
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
          <CategoryCard/>
        </ScrollView>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  category: {
    marginTop: nh(30),
    marginLeft: nw(13),
    marginBottom: nh(15),
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    lineHeight: 24,
  },
  categoryContainer: {
    width: nw(390),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});

export default CategoryScreen;
