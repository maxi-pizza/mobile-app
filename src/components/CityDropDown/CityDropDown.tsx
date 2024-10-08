import React, {useCallback, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import Caret from '../../assets/Icons/Caret.svg';
import MapPin from '../../assets/Icons/MapPinMapPin.svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

const CityDropDown = () => {
  const [isActive, setIsActive] = useState('Одесса');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCityPress = (city: string) => {
    const cityName = city.split(',')[0];
    setIsActive(cityName);
    bottomSheetModalRef.current?.dismiss();
  };


  const cities = ['Одесса, Базарна, 69', 'Чорноморськ, Базарна, 69'];

  return (
      <Pressable style={styles.cityContainer} onPress={openBottomSheet}>
        <MapPin color="white"/>
        <Text style={styles.whiteText}>{isActive}</Text>
        <Caret color="white"/>
          <BottomSheetModal
              ref={bottomSheetModalRef}
              snapPoints={['25%']}
              backgroundStyle={styles.bottom}
              handleIndicatorStyle={styles.indicator}
              style={styles.modal}
          >
            <View style={styles.bottomSheetContent}>
              <View style={styles.mapPinWrapper}>
                <Text style={styles.chooseText}>Выберите город</Text>
                <MapPin color="white"/>
              </View>
              {cities.map((city) => (
                  <Pressable key={city} onPress={() => handleCityPress(city)}>
                    <Text style={styles.cityText}>{city}</Text>
                  </Pressable>
              ))}
            </View>
          </BottomSheetModal>
      </Pressable>
  );
};

const styles = StyleSheet.create({
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: nw(12),
    fontSize: nw(15),
  },
  whiteText: {
    color: 'white',
  },
  bottomSheetContent: {
    backgroundColor: '#1C1C1C',
    height: nh(166),
    paddingLeft: nw(15),
    width: nw(365),
    borderRadius: 10,
  },
  cityText: {
    fontFamily: 'MontserratRegular',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 18,
    color: 'white',
    marginBottom: nh(10),
  },
  modal: {
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
  },
  mapPinWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: nh(20),
    marginTop: nh(15),
  },
  chooseText: {
    fontFamily: 'MontserratRegular',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: 'white',
    paddingBottom: nh(10),
  },
  bottom: {
    backgroundColor: 'transparent',
    borderRadius: 15,
  },
  indicator: {
    backgroundColor: 'transparent',
  },
});

export default CityDropDown;
