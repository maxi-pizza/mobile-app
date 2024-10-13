import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import {CategoryCard} from '../../../../components/CategoryCard/CategoryCard.tsx';
import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {categoriesQuery} from '../../categories.query.ts';

const CategoryScreen = ({route, navigation}: {route: any; navigation: any}) => {
  const {data: categories, isLoading} = useQuery({
    ...categoriesQuery(),
  });
  // todo: make global storage(mobx)
  // todo: make sticky category
  const onHandleCategory = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Header route={route} />
      <Text style={styles.category}>Категории</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}>
        {categories?.data.map(category => (
          <View key={category.id} style={styles.categoryWrapper}>
            <CategoryCard
              setCategorySlug={onHandleCategory}
              category={category}
            />
          </View>
        ))}
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
