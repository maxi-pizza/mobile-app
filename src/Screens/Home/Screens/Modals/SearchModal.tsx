import React, {useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import Header from '../../../../components/Header/Header.tsx';
import Search from '../../../../components/Search/Search.tsx';
import {nh, nw} from '../../../../../normalize.helper.ts';
import NoResultSearch from '../../../../assets/Icons/NoResultSearch.svg';
import {useQuery} from '@tanstack/react-query';
import {DEFAULT_PRODUCT_LIMIT, productsQuery} from '../../products.query.ts';
import {Product} from '../../../../models/Product.ts';
import ProductCard from '../../../../components/ProductCard/ProductCard.tsx';
import {fuzzySearch} from '../../../../common/utils/fuzzySearch.ts';

const SearchModal = ({navigation}: {navigation: any}) => {
  const [search, setSearch] = useState('');
  const {data: productsRes} = useQuery(
    productsQuery({
      category_slug: 'menu',
      limit: DEFAULT_PRODUCT_LIMIT,
    }),
  );

  const onSearchHandle = (e: string) => {
    setSearch(e);
  };

  const searched =
    search.length > 2
      ? fuzzySearch(productsRes?.data || [], search, product => product.name)
      : [];

  const items = searched.map(item => new Product(item));

  const searchFeedback = () => {
    const getLetters = (length: number) => {
      if (length === 1) {
        return `${length} символ`;
      }

      return `${length} символа`;
    };

    if (search.length === 0) {
      return 'Почніть шукати';
    }
    if (search.length < 3) {
      return `Введіть на ${getLetters(3 - search.length)} більше`;
    }
    if (searched.length === 0) {
      return `Нічого не знайдено`;
    }
    return `Результати пошуку (${searched.length}):`;
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.searchContainer}>
        <Search onSearch={onSearchHandle} autoFocus={true} />
        <Text style={styles.feedbackText}>{searchFeedback()}</Text>
      </View>
      {items.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatList}
          data={items}
          renderItem={({item}) => (
            <ProductCard product={item} navigation={navigation} />
          )}
        />
      ) : (
        <View style={styles.noResultSearch}>
          <View>
            <NoResultSearch
              color={'#393939'}
              width={nw(200)}
              height={nh(200)}
            />
            <Text style={styles.noResultText}>Ничего не найдено</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#141414',
  },
  searchContainer: {
    backgroundColor: '#171717',
    height: nh(100),
    paddingTop: nh(20),
    display: 'flex',
    alignItems: 'center',
  },
  flatList: {
    display: 'flex',
    alignItems: 'center',
    marginTop: nh(20),
  },
  noResultSearch: {
    marginTop: nh(100),
    display: 'flex',
    alignItems: 'center',
  },
  noResultText: {
    color: '#727272',
    fontSize: 14,
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    width: nw(200),
    textAlign: 'center',
    marginTop: nh(15),
  },
  feedbackText: {
    color: 'white',
    marginTop: nh(10),
    fontFamily: 'MontserratRegular',
    fontSize: 14,
  },
});

export default SearchModal;
