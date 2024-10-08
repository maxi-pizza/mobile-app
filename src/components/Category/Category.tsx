import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '../CategoryCard/CategoryCard.tsx';
import {nh, nw} from '../../../normalize.helper.ts';
import {useQuery} from '@tanstack/react-query';
import {categoriesQuery} from '../../Screens/Category/categories.query.ts';

const Category = () => {
  const { data: categories, isLoading} = useQuery({
    ...categoriesQuery(),
  });

  return (
     <View style={styles.container}>
       <Text style={styles.title}>Категории</Text>
       <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryCardsContainer}>
         {categories?.data.map((category) => (
             <View key={category.id} style={styles.categoryWrapper}>
               <CategoryCard category={category}/>
             </View>
         ))}
       </ScrollView>
     </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: nh(15),
    width: nw(365),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    marginTop: nh(30),
    fontSize: 20,
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

export default Category;
