import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '~/components';
import {nh, nw} from '~/common/normalize.helper.ts';
import {useQuery} from '@tanstack/react-query';
import store from '~/stores/store.ts';
import {observer} from 'mobx-react-lite';
import {dataQuery} from "~/queries/data.query.ts";

export const Category = observer(() => {
  const {data: catalogQueryData} = useQuery({
    ...dataQuery(),
  });

  useEffect(() => {
    const categories = catalogQueryData?.categories || [];
    if (categories.length > 0) {
      store.changeCategory(String(categories[0].slug));
    }
  }, [catalogQueryData]);

  const categories = catalogQueryData?.categories || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Категорії</Text>
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
