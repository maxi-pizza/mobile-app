import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import {CategoryCard} from '../../../../components/CategoryCard/CategoryCard.tsx';
import Header from '../../../../components/Header/Header.tsx';

const CategoryScreen = ({ route}: { route: any}) => {
  return (
      <View style={styles.container}>
        <Header route={route}/>
        <Text style={styles.category}>Категории</Text>
        <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContainer} >
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
          <View style={styles.categoryWrapper}>
            <CategoryCard/>
          </View>
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
  categoryWrapper: {
    marginBottom: nh(15),
  },
  category: {
    marginTop: nh(30),
    width: nw(365),
    marginBottom: nh(15),
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    lineHeight: 24,
  },
  categoryContainer: {
    width: nw(365),
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default CategoryScreen;
