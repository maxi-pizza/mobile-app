import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';


import MapPin from '../../assets/Icons/MapPinMapPin.svg';
import Caret from '../../assets/Icons/Caret.svg';
import Logo from '../../assets/Logo.svg';



const Header = () => {
  return (
      <View style={styles.container}>
        <View style={styles.languageContainer}>
          <Text>UA</Text>
          <Text> | </Text>
          <Text>RU</Text>
        </View>

        <Logo/>
        <View style={styles.cityContainer}>
          <MapPin color="white"/>
          <Text>Odessa</Text>
          <Caret color="white"/>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(61),
  },
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: nw(93),
    marginRight: nw(12),
    fontSize: nw(15),
  },
  languageContainer: {
    flexDirection: 'row',
    width: nw(66),
    marginLeft: nw(13),
  },
  logo: {
    width: nw(73),
  },
});


export default Header;
