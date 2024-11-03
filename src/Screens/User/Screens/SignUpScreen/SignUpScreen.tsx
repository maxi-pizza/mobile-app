import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';
import InformationInput from '../../components/InformationInput/InformationInput.tsx';
import PasswordInput from '../../components/PasswordInput/PasswordInput.tsx';
import CheckBox from '../../../../components/CheckBox/CheckBox.tsx';
import Header from '../../../../components/Header/Header.tsx';

const SignUpScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      {/*<Header />*/}
      {/*<Text style={styles.header}>Регистрация</Text>*/}
      {/*<View>*/}
      {/*  <View style={styles.inputMargin}>*/}
      {/*    <InformationInput placeholder={'Имя'} inputMode={'text'} />*/}
      {/*  </View>*/}
      {/*  <View style={styles.inputMargin}>*/}
      {/*    <InformationInput placeholder={'Фамилия'} inputMode={'text'} />*/}
      {/*  </View>*/}
      {/*  <View style={styles.inputMargin}>*/}
      {/*    <InformationInput placeholder={'Email'} inputMode={'email'} />*/}
      {/*  </View>*/}
      {/*  <View style={styles.inputMargin}>*/}
      {/*    <PasswordInput />*/}
      {/*  </View>*/}
      {/*  <View style={styles.agreementWrapper}>*/}
      {/*    <CheckBox />*/}
      {/*    <Text style={styles.agreementText}>*/}
      {/*      Я согласен с условиями использования и обработки моих персональных*/}
      {/*      данных*/}
      {/*    </Text>*/}
      {/*  </View>*/}

      {/*  <TouchableOpacity style={styles.btn}>*/}
      {/*    <Text style={styles.btnText}>Регистрация</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <View style={styles.textWrapper}>*/}
      {/*    <Text style={styles.yellowText}>*/}
      {/*      Уже есть аккаунт?{' '}*/}
      {/*      <Text*/}
      {/*        onPress={() => navigation.navigate('SignIn')}*/}
      {/*        style={styles.link}>*/}
      {/*        Войти*/}
      {/*      </Text>*/}
      {/*    </Text>*/}
      {/*  </View>*/}
      {/*</View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
    lineHeight: 24,
    fontWeight: '600',
    marginTop: nh(30),
    marginBottom: nh(30),
  },
  inputMargin: {
    marginBottom: nh(15),
  },
  check: {
    width: nw(50),
  },
  btn: {
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#FFE600',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: nh(20),
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    fontSize: nh(15),
    color: 'black',
  },
  yellowText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(12),
    color: '#FFE600',
  },
  link: {
    textDecorationLine: 'underline',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: nh(10),
  },
  agreementText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(11),
    fontWeight: '400',
    color: 'white',
    width: nw(266),
    height: nh(30),
    marginLeft: nw(10),
  },
  agreementWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default SignUpScreen;
