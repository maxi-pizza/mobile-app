import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '../CategoryCard/CategoryCard.tsx';
import {nw} from '../../../normalize.helper.ts';

const Category = () => {
  return (
     <View style={styles.container}>
       <Text style={styles.title}>Категории</Text>
       <ScrollView horizontal={true} contentContainerStyle={styles.categoryCardsContainer} overScrollMode="always">
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
    marginLeft: 13,
    marginBottom: 30,
  },
  title: {
    marginTop: 30,
    fontSize: 20,
    marginBottom: 15,
  },
  categoryCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: nw(390),
  },
});

export default Category;
