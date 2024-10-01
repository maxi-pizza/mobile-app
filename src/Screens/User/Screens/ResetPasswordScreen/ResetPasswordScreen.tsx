import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import InformationInput from '../../components/InformationInput/InformationInput.tsx';
import Header from '../../../../components/Header/Header.tsx';

const ResetPasswordScreen = ({ route}: { route: any}) => {
  return (
      <View style={styles.container}>
        <Header route={route}/>
        <Text style={styles.header}>
          Восстановление пароля
        </Text>
        <InformationInput placeholder="Email" inputMode="email"/>
        <Text style={styles.emailText}>Введите Ваш E-mail адрес для которого необходимо скинуть пароль</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Отправить</Text>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.yellowText}>Не пришел код? <Text style={styles.link}>Отправить ещё</Text></Text>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    marginTop: nh(30),
    marginBottom: nh(30),
  },
  emailText: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    color: 'white',
    marginTop: nh(10),
    marginBottom: nh(20),
    width: nw(365),
  },
  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#FFE600',
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '500',
    color: 'black',
  },
  yellowText: {
    fontFamily: 'MontserratRegular',
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    color: '#FFE600',
  },
  link: {
    textDecorationLine: 'underline',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: nh(10),
    width: nw(365),
  },
});

export default ResetPasswordScreen;
