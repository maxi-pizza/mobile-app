import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import Header from '../../../../components/Header/Header.tsx';
import {useQuery} from '@tanstack/react-query';
import {categoriesQuery} from '../../categories.query.ts';
import {observer} from 'mobx-react-lite';
import Category from '../components/Category.tsx';
import categoryStore from '../../../../stores/store.ts';
import store from '../../../../stores/store.ts';

const CategoryScreen = observer(({navigation}: {navigation: any}) => {
  const {data: categoriesRes, isLoading} = useQuery({
    ...categoriesQuery(),
  });
  const categories = (categoriesRes?.data || [])
    .map(category => category)
    .filter(category =>
      store.city === 'chorno' ? category.slug !== 'pitsa' : true,
    );
  const onHandleCategory = (slug: string) => {
    categoryStore.changeCategory(slug);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.category}>Категории</Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContainer}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryWrapper}>
            <Category
              categoryHandle={() => onHandleCategory(category.slug)}
              category={category}
            />
          </View>
        ))}
      </ScrollView>
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
