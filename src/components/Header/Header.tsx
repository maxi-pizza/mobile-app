import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import Logo from '../../assets/Logo.svg';
import MapPin from '../../assets/Icons/MapPinMapPin.svg';
import Caret from '../../assets/Icons/Caret.svg';
import DropDown from '../DropDown/DropDown.tsx';

import {useQuery} from '@tanstack/react-query';
import store from '../../stores/store.ts';
import {cityQuery} from './city.query.ts';

const Header = () => {
  const {data: citiesRes} = useQuery(cityQuery);
  const cities = (citiesRes || []).map(c => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));

  const onChange = (value: number | string | undefined) => {
    const city = cities.find(c => c.id === value);
    if (city) {
      store.changeCity(city.slug);
    }
  };
  const selected = cities.find(c => c.slug === store.city);

  return (
    <View style={styles.container}>
      <View style={styles.block} />
      <Logo style={styles.logo} />
      <View>
        <DropDown
          snapPoints={'29%'}
          options={cities}
          onChange={onChange}
          value={selected?.id}
          placeholder={
            <>
              <Text style={[styles.chooseText, {marginRight: nw(10)}]}>
                Выберите город
              </Text>
              <MapPin color="white" />
            </>
          }>
          <View style={styles.cityContainer}>
            <MapPin color="white" />
            <Text style={styles.whiteText}>{selected?.name}</Text>
            <Caret color="white" />
          </View>
        </DropDown>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(61),
    justifyContent: 'flex-end',
    width: '100%',
  },
  whiteText: {
    color: 'white',
    marginRight: nw(5),
    marginLeft: nw(3),
    fontSize: nh(14),
  },
  logo: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -nw(36.5)}],
    width: nw(73),
    height: nh(31),
  },
  block: {
    width: nw(79),
    height: nh(18),
  },
  cityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: nw(12),
    minWidth: nw(30),
  },
  chooseText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(16),
    fontWeight: '500',
    lineHeight: 19,
    color: 'white',
    paddingBottom: nh(10),
  },
});

export default Header;
