import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import Phone from '../../../../assets/Icons/Phone.svg';
import Instagram from '../../../../assets/Icons/Instagram.svg';
import Telegram from '../../../../assets/Icons/Telegram.svg';

const ContactsScreen = () => {
  return (
      <View style={styles.container}>
        <Text style={styles.header}>Контакты</Text>
        <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.btn}><Instagram width="17" height="17" color="black"/><Text style={styles.btnText}> Наш инстаграм | @emoji_sushi</Text></TouchableOpacity>
          <TouchableOpacity style={styles.btn}><Telegram width="17" height="17" color="black"/><Text style={styles.btnText}>  Наш телеграм | @emoji_sushi</Text></TouchableOpacity>
        </View>
        <View style={styles.phoneWrapper}>
          <View style={styles.phoneSvgWrapper}>
            <Text><Phone width="15" color="#727272"/></Text>
            <Text style={styles.phoneText}> +38 (093) 366 28 69</Text>
          </View>

          <View style={styles.phoneSvgWrapper}>
            <Text><Phone width="15" color="#727272"/></Text>
             <Text style={styles.phoneText}> +38 (068) 303 45 51</Text>
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
  header: {
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 24,
    color: 'white',
    marginTop: nh(30),
    marginLeft: nw(13),
  },
  btnWrapper: {
    display: 'flex',
    marginTop: nh(30),
    alignItems: 'center',
  },
  btn: {
    width: nw(365),
    height: nh(42),
    borderRadius: 10,
    backgroundColor: '#FFE600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: nh(15),
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: 'black',
  },
  phoneWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: nh(15),
  },
  phoneText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
  },
  phoneSvgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ContactsScreen;
