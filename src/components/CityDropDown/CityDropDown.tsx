import React, {useCallback, useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

import Caret from '../../assets/Icons/Caret.svg';
import MapPin from '../../assets/Icons/MapPinMapPin.svg';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import {agent} from '../../../APIClient.tsx';
import store from '../../stores/store.ts';
import {observer} from 'mobx-react-lite';

export const cityQuery = {
  queryKey: ['cities'],
  queryFn: async () => {
    const res = await agent.getCities({
      includeSpots: false,
      includeDistricts: false,
    });
    return res.data;
  },
};

const CityDropDown = observer(() => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const {data: cities} = useQuery(cityQuery);
  const city = (cities || []).find(c => c.slug === store.city);

  const handleCityPress = (city: string) => {
    store.changeCity(city);
    bottomSheetModalRef.current?.dismiss();
  };

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <Pressable style={styles.cityContainer} onPress={openBottomSheet}>
      <MapPin color="white" />
      <Text style={styles.whiteText}>{city?.name}</Text>
      <Caret color="white" />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['25%']}
        backgroundStyle={styles.bottom}
        handleIndicatorStyle={styles.indicator}
        style={styles.modal}>
        <View style={styles.bottomSheetContent}>
          <View style={styles.mapPinWrapper}>
            <Text style={[styles.chooseText, {marginRight: nw(10)}]}>
              Выберите город
            </Text>
            <MapPin color="white" />
          </View>
          {cities?.map(city => (
            <Pressable key={city.id} onPress={() => handleCityPress(city.slug)}>
              <Text style={styles.cityText}>{city.name}</Text>
            </Pressable>
          ))}
        </View>
      </BottomSheetModal>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  cityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: nw(12),
    fontSize: nw(15),
    minWidth: nw(30),
  },
  whiteText: {
    color: 'white',
    marginRight: nw(5),
    marginLeft: nw(3),
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
