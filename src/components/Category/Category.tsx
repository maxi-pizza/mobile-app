import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {CategoryCard} from '../CategoryCard/CategoryCard.tsx';
import {nh, nw} from '../../../normalize.helper.ts';

const Category = () => {
  return (
     <View style={styles.container}>
       <Text style={styles.title}>Категории</Text>
       <ScrollView horizontal={true} contentContainerStyle={styles.categoryCardsContainer}>
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
    marginBottom: nh(30),
    marginLeft: nw(13),
  },
  title: {
    marginTop: nh(30),
    fontSize: 20,
    marginBottom: nw(15),
  },
  categoryCardsContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default Category;
