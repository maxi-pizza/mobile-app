import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import SavedAddress from './components/SavedAddress.tsx';
import Header from '../../../../components/Header/Header.tsx';

const SavedAddressesScreen = () => {
  return (
    <View style={styles.container}>
      {/*<Header/>*/}
      {/*<Text style={styles.header}>Збережені адреси</Text>*/}
      {/*<SavedAddress address="Литвиненко-Вольгемут 1Г" />*/}
      {/*<SavedAddress address="Литвиненко-Вольгемут 1Г" />*/}
      {/*<TouchableOpacity style={styles.btn}>*/}
      {/*  <Text style={styles.btnText}>Добавить адрес</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
    fontWeight: '600',
    lineHeight: 24,
    marginTop: nh(30),
    marginBottom: nh(30),
    width: nw(365),
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '500',
    color: 'black',
  },
  btn: {
    backgroundColor: '#FFE600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: nw(365),
    height: nh(44),
    borderRadius: 10,
  },
});

export default SavedAddressesScreen;
