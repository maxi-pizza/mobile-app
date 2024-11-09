import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import ErrorSvg from '~/assets/Icons/Error.svg';
import {nh, nw} from '~/common/normalize.helper.ts';
import store from '~/stores/store.ts';

const ErrorScreen = ({resetError}: {resetError: () => void}) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorWrapper}>
        <ErrorSvg height={nh(100)} width={nw(100)} />
        <Text style={styles.errorText}>Нажаль сталася помилка</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            store.nav!.goBack();
            resetError();
          }}>
          <Text style={styles.btnText}>Повернутися на головну сторінку</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
  errorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: nh(240),
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(18),
    color: 'white',
    fontWeight: '700',
    marginTop: nh(20),
  },
  btn: {
    height: nh(40),
    width: nw(260),
    backgroundColor: '#FFE600',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: nh(25),
  },
  btnText: {
    color: 'black',
    fontSize: nh(14),
    fontWeight: '600',
    fontFamily: 'MontserratRegular',
  },
});

export default ErrorScreen;
