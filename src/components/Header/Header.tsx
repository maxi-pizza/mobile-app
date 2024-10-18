import React from 'react';
import {StyleSheet, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import CityDropDown from '../CityDropDown/CityDropDown.tsx';

import Logo from '../../assets/Logo.svg';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.block} />
      <Logo style={styles.logo} />
      <View>
        <CityDropDown />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(61),
    width: '100%',
  },
  logo: {
    width: nw(73),
    height: nh(31),
    position: 'absolute',
    left: '50%',
    transformOrigin: 'center',
    transform: [{translateX: -50}],
  },
  block: {
    width: nw(79),
    height: nh(18),
  },
});

export default Header;
