import React, {useCallback, useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';
import {BottomSheetModal} from '@gorhom/bottom-sheet';

import Caret from '../../assets/Icons/Caret.svg';
import MapPin from '../../assets/Icons/MapPinMapPin.svg';
import {observer} from 'mobx-react-lite';

type OptionProps = {
  id: number;
  name: string;
};

const DropDown = observer(
  ({
    placeholder,
    options,
    value,
    onChange,
    error,
  }: {
    placeholder: string;
    options: OptionProps[];
    value: string | number | undefined;
    onChange: (value: string | number | undefined) => void;
    error?: string;
  }) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openBottomSheet = useCallback(() => {
      bottomSheetModalRef.current?.present();
    }, []);
    const handleOptionPress = (option: OptionProps) => {
      onChange(option.id);
      bottomSheetModalRef.current?.dismiss();
    };

    const selected = options.find(option => option.id === value);

    return (
      <Pressable style={styles.container} onPress={openBottomSheet}>
        <View style={styles.inputContainer}>
          <Text style={styles.selectOption}>
            {selected ? (
              <Text style={styles.whiteText}>{selected.name}</Text>
            ) : (
              placeholder
            )}
          </Text>
          <Caret color="#727272" width="15" />
        </View>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['30%']}
          backgroundStyle={styles.bottom}
          handleIndicatorStyle={styles.indicator}
          style={styles.modal}>
          <View style={styles.bottomSheetContent}>
            <View style={styles.mapPinWrapper}>
              <Text style={[styles.chooseText, {marginRight: nw(10)}]}>
                Выберите адрес
              </Text>
              <MapPin color="white" />
            </View>
            {options.map(option => (
              <Pressable
                key={option.id}
                onPress={() => handleOptionPress(option)}>
                <Text style={styles.cityText}>{option.name}</Text>
              </Pressable>
            ))}
          </View>
        </BottomSheetModal>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </Pressable>
    );
  },
);

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
    backgroundColor: 'transparent',
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
    height: nh(190),
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
  errorContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'rgb(205, 56, 56)',
    position: 'absolute',
    right: 0,
    top: 45,
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
});

export default DropDown;
