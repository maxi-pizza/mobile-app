import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../../../components/Header/Header.tsx';
import BackButton from '../../../../components/BackButton/BackButton.tsx';

const ThankYou = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header />
      <BackButton navigation={navigation} />
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
});
export default ThankYou;
