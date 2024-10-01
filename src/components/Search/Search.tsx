import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import MagnifyingGlass from '../../assets/Icons/MagnifyingGlass.svg';

const Search = () => {
  return (
      <View style={styles.container}>
        <MagnifyingGlass style={styles.magnify}/>
        <TextInput scrollEnabled={false} multiline={false} placeholderTextColor="#3F3F3F" style={styles.input} placeholder="Что-то ищете?" />
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: nw(365),
    height: nh(40),
    backgroundColor: '#1C1C1C',
    borderRadius: nw(10),
    position: 'relative',
  },
  magnify: {
    position: 'absolute',
    top: nh(10),
    left: nw(10),
  },
  input: {
    paddingLeft: nw(35),
    lineHeight: 18,
    height: '100%',
    fontSize: 12,
  },
});
export default Search;
