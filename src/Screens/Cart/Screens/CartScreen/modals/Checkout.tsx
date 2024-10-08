import React  from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';

import Swiper from '../components/Swiper.tsx';
import InformationInput from '../../../../User/components/InformationInput/InformationInput.tsx';
import DropDown from '../../../../../components/DropDown/DropDown.tsx';
import Header from '../../../../../components/Header/Header.tsx';
import BackButtonScreen from '../../../../../components/BackButtonScreen/BackButtonScreen.tsx';


const Checkout = ({navigation, route}: {navigation: any, route: any}) => {

  const addresses = [
      'Odessa',
      'fssffs',
      'nerufsdb',
      'fsdfsd',
  ];


  return (
        <View>
          <Header route={route} navigation={navigation}/>
          <BackButtonScreen navigation={navigation}/>
          <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView} showsVerticalScrollIndicator={false}>
              <Text style={styles.header}>Оформление заказа</Text>

              <View>
                <Text style={[styles.greyText, {marginBottom: nh(10)}]}>Способ доставки</Text>
                <Swiper/>
              </View>
              <View style={styles.textWrapper}>
                <View style={styles.circle}><Text style={{color: 'black'}}>1</Text></View>
                <Text style={[styles.greyText, {marginLeft: nw(15)}]}>Введите данные для доставки</Text>
              </View>

              <View style={styles.inputWrapper}>
                <InformationInput placeholder="Имя" inputMode="text"/>
              </View>
              <View style={styles.inputWrapper}>
                <InformationInput placeholder="Имя" inputMode="text"/>
              </View>
              <View style={styles.inputWrapper}>
                <InformationInput placeholder="Имя" inputMode="text"/>
              </View>

              <DropDown placeholder="Выберите район доставки" options={addresses}/>

              <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
                <InformationInput placeholder="Имя" inputMode="text"/>
              </View>
              <View style={styles.textWrapper}>
                <View style={styles.circle}><Text style={{color: 'black'}}>2</Text></View>
                <Text style={[styles.greyText, {marginLeft: nw(15)}]}>Способ оплаты</Text>
              </View>
              <Swiper/>
              <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
                <InformationInput placeholder="Приготовить сдачу с" inputMode="text"/>
              </View>
              <View style={styles.inputWrapper}>
                <InformationInput placeholder="Комментарий к заказу" inputMode="text"/>
              </View>
              <Text style={[styles.whiteText, {fontSize: 16, fontWeight: '500', marginTop: nh(30)}]}>Сумма заказа</Text>
              <View style={styles.priceWrapper}>
                <Text style={styles.whiteText}>Доставка</Text>
                <Text style={styles.whiteText}>50 ₴</Text>
              </View>
              <View style={styles.verticalBar}/>
              <View style={styles.priceWrapper}>
                <Text style={styles.whiteText}>К оплате</Text>
                <Text style={styles.whiteText}>15 906 ₴</Text>
              </View>
              <TouchableOpacity style={styles.orderBtn}>
                <Text style={styles.blackText}>Заказать</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  scrollView: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 23,
    color: 'white',
    width: nw(365),
    marginBottom: nh(15),
    marginTop: nh(30),
  },
  verticalBar: {
    height: nh(1),
    backgroundColor: '#202020',
    width: nw(390),
  },
  productWrapper: {
    marginBottom: nh(15),
  },
  whiteText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: 'white',
  },
  blackText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 17,
    color: 'black',
  },
  greyText: {
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 17,
    color: '#616161',
  },
  circle: {
    width: nw(20),
    height: nw(20),
    backgroundColor: '#FFE600',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    width: nw(365),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: nh(15),
    marginBottom: nh(10),
  },
  inputWrapper: {
    marginBottom: nh(15),
  },
  priceWrapper: {
    width: nw(365),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: nh(15),
    marginBottom: nh(15),
  },
  orderBtn: {
    width: nw(365),
    height: nh(50),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE600',
    borderRadius: 10,
    marginBottom: nh(180),
  },
});

export default Checkout;
