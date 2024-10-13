import React from 'react';
import { StyleSheet, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import CityDropDown from '../CityDropDown/CityDropDown.tsx';

import Logo from '../../assets/Logo.svg';
import LanguageChange from '../LanguageChange/LanguageChange.tsx';



const Header = ({ route}: {navigation?: any; route?: any}) => {

  return (
      <View style={styles.container}>
        {route?.name === 'Home' || route?.name === 'UserScreen' ? (
            <LanguageChange/>
        ) : (
            <View style={styles.block}/>
        )}
        <Logo style={styles.logo}/>
        <CityDropDown/>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(61),
    width: '100%',
  },
  logo: {
    width: nw(73),
    height: nh(31),
  },
  block: {
    width: nw(79),
    height: nh(18),
  },
});


export default Header;
