import React, {useCallback, useEffect, useRef} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {appConfig} from '~/config/app.ts';

import LockKeySvg from '~/assets/Icons/LockKey.svg';
import {nh, nw} from '~/common/normalize.helper.ts';

function addLeadingZero(number: number) {
  return '0'.concat(number + '').slice(-2);
}

export const isClosed = ({start, end}: {start: number[]; end: number[]}) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return (
    hours < start[0] ||
    (start[0] === hours && minutes < start[1]) ||
    hours > end[0] ||
    (end[0] === hours && minutes > end[1])
  );
};

const ClosedRestaurant = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const closed = isClosed({
    start: appConfig.workingHours[0],
    end: appConfig.workingHours[1],
  });

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const onHandleClose = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  useEffect(() => {
    if (closed) {
      openBottomSheet();
    }
  }, []);
  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={['41%']}
      style={styles.container}
      backgroundStyle={styles.container}
      handleIndicatorStyle={styles.indicator}>
      <View style={styles.backgroundContainer}>
        <LockKeySvg color={'yellow'} width={100} height={100} />
        <Text style={styles.whiteText}>Ресторан зачинено</Text>
        <Text
          style={[
            styles.whiteText,
            {fontWeight: '400', fontSize: nh(14), marginBottom: nh(15)},
          ]}>
          Робочий час {appConfig.workingHours[0][0]}:
          {addLeadingZero(appConfig.workingHours[0][1])} -{' '}
          {appConfig.workingHours[1][0]}:{appConfig.workingHours[1][1]}
        </Text>
        <Pressable style={styles.btn} onPress={onHandleClose}>
          <Text style={styles.btnText}>Закрити</Text>
        </Pressable>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundContainer: {
    width: nw(365),
    height: nh(285),
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: 'transparent',
  },
  btn: {
    width: nw(255),
    height: nh(37),
    backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '700',
    color: 'black',
  },
  whiteText: {
    fontFamily: 'MontserratRegular',
    color: 'white',
    fontSize: nh(16),
    fontWeight: '500',
    marginTop: nh(5),
  },
});

export default ClosedRestaurant;
