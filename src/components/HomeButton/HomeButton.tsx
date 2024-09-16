import { StyleSheet, View } from 'react-native';
import { nw } from '../../../normalize.helper.ts';
import HomeButtonSvg from '../../assets/Icons/home.svg';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    width: nw(60),
    height: nw(60),
    backgroundColor: '#FFE600',
    borderRadius: nw(60),
    alignItems: 'center',
    justifyContent: 'center',

  },
  img: {
    width: nw(20),
    height: nw(20),
  },
  shadowProp: {
    shadowColor: '#FFE60080',
    //shadowOffset: {width: -2, height: 2},
    //shadowOpacity: 1,
    //shadowRadius: 3,
    elevation: 20,
  },
  margin: {
    marginBottom: 50,
  },
});

const HomeButton: React.FC = () => {
  return (
    <View style={[styles.container, styles.shadowProp, styles.margin]}>
        <HomeButtonSvg style={styles.img} />
    </View>

  );
};

export default HomeButton;
