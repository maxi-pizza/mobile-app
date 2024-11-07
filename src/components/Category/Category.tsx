import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '~/components';
import {nh, nw} from '~/common/normalize.helper.ts';
import {useQuery} from '@tanstack/react-query';
import {categoriesQuery} from '~/Screens/Category/categories.query.ts';
import store from '~/stores/store.ts';
import {observer} from 'mobx-react-lite';

export const Category = observer(() => {
  const {data: categoriesRes, isLoading} = useQuery({
    ...categoriesQuery(),
  });
  const categories = (categoriesRes?.data || [])
    .map(category => category)
    .filter(category =>
      store.city === 'chorno' ? category.slug !== 'pitsa' : category.slug,
    );
  useEffect(() => {
    if (categories.length > 0) {
      store.changeCategory(String(categories[0].slug));
    }
  }, [categories]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Категории</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryCardsContainer}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryWrapper}>
            <CategoryCard category={category} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: nh(15),
    width: nw(365),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
    marginBottom: nw(15),
  },
  categoryCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  categoryWrapper: {
    marginRight: nw(15),
  },
});
