import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Header} from '~/components';
import Success from '~/assets/Icons/Success.svg';
import {nh, nw} from '~/common/normalize.helper.ts';

const ThankYou = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.wrapper}>
        <View style={styles.textWrapper}>
          <View>
            <Text style={[styles.whiteText, styles.bigText]}>
              Ваше замовлення успішно прийнято та відправлено в роботу!
            </Text>
          </View>
          <Success width={nw(100)} height={nh(100)} color={'yellow'} />
          <View>
            <Text style={[styles.whiteText, {width: nw(300)}]}>
              Найближчим часом Вам зателефонує менеджер для підтвердження
              замовлення. Потім замовлення буде підготовлено та надіслано на
              вказану Вами адресу.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.btnText}>Повернутися на головний екран</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  wrapper: {
    marginTop: nh(110),
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  whiteText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(15),
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  bigText: {
    fontSize: nh(17),
    fontWeight: '700',
  },
  btn: {
    marginTop: nh(15),
    backgroundColor: '#FFE600',
    width: nw(340),
    height: nh(47),
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'black',
    fontFamily: 'MontserratRegular',
    fontSize: nh(15),
    fontWeight: '700',
  },
});
export default ThankYou;
