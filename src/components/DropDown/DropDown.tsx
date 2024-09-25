import React, {useCallback, useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import Caret from '../../assets/Icons/Caret.svg';
import MapPin from "../../assets/Icons/MapPinMapPin.svg";




const DropDown = ({placeholder, options}: {placeholder: string; options: string[]}) => {
  const [isActive, setIsActive] = useState('');


  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCityPress = (option: string) => {
    setIsActive(option);
    bottomSheetModalRef.current?.dismiss();
  };


  return (
      <Pressable style={styles.container} onPress={openBottomSheet}>
        <View style={styles.inputContainer}>
          <Text style={styles.selectOption}>{placeholder}</Text>
          <Caret color="#727272" width="15"/>
        </View>

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
            {options.map((option) => (
                <Pressable key={option} onPress={() => handleCityPress(option)}>
                  <Text style={styles.cityText}>{option}</Text>
                </Pressable>
            ))}
          </View>
        </BottomSheetModal>

      </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#272727',
    paddingLeft: nw(10),
    paddingRight: nw(10),
  },
  selectOption: {
    color: '#616161',
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '400',
  },
  dropDownContent: {
    width: nw(365),
    backgroundColor: '#1C1C1C',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
    backgroundColor: '#1C1C1C',
    borderRadius: 15,
  },
  indicator: {
    backgroundColor: '#1C1C1C',
  },
});

export default DropDown;
