import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';

import Swiper from '../components/Swiper.tsx';
import InformationInput from '../../../../User/components/InformationInput/InformationInput.tsx';
import DropDown from '../../../../../components/DropDown/DropDown.tsx';
import Header from '../../../../../components/Header/Header.tsx';
import BackButtonScreen from '../../../../../components/BackButton/BackButton.tsx';
import {useQuery} from '@tanstack/react-query';
import {spotsQuery} from '../../../spots.query.ts';

import Truck from '../../../../../assets/Icons/Truck.svg';
import Package from '../../../../../assets/Icons/Package.svg';
import Card from '../../../../../assets/Icons/CreditCard.svg';
import Cash from '../../../../../assets/Icons/Money.svg';

import {shippingQuery} from '../../../shipping.query.ts';
import {paymentQuery} from '../../../payment.query.ts';
import {cityQuery} from '../../../../../components/CityDropDown/CityDropDown.tsx';
import store from '../../../../../stores/store.ts';
import {observer} from 'mobx-react-lite';
import {cartQuery} from '../../../cart.query.ts';

enum ApartmentMethod {
  Apartment = 'apartment',
  House = 'house',
}
enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
}
enum DeliveryMethod {
  Courier = 'courier',
  Takeaway = 'takeaway',
}

const Checkout = observer(({navigation}: {navigation: any}) => {
  const [paymentMethodValue, setPaymentMethodValue] = useState<string>(
    PaymentMethod.Cash,
  );
  const [deliveryMethodValue, setDeliveryMethodValue] = useState<string>(
    DeliveryMethod.Takeaway,
  );
  const [apartmentMethodValue, setApartmentMethodValue] = useState<string>(
    ApartmentMethod.House,
  );
  const {data: spotsRes} = useQuery(spotsQuery);
  const {data: cityRes} = useQuery(cityQuery);
  const {data: cart} = useQuery(cartQuery);

  const {data: shippingRes} = useQuery(shippingQuery);
  const {data: paymentRes} = useQuery(paymentQuery);
  const shipping = (shippingRes?.data || []).map(ship => ship);
  const shippingIcons = [Package, Truck];
  const shippingObj = shipping.map((item, index) => ({
    value: item.code,
    name: item.name,
    icon: shippingIcons[index],
  }));

  const paymentIcons = [Cash, Card];
  const payment = (paymentRes?.data || []).map(item => item);
  const paymentObj = payment.map((item, index) => ({
    value: item.code,
    name: item.name,
    icon: paymentIcons[index],
  }));

  const addresses = (spotsRes || []).map(spot => spot);
  const filteredAddresses = addresses.filter(
    spot => spot.city?.slug === store.city,
  );
  const addressArray = filteredAddresses.map(address => ({
    id: address.id,
    name: address.name,
  }));

  const city = (cityRes || []).find(c => c.slug === store.city);
  const districts = (city?.districts || []).map(district => ({
    id: district.id,
    name: district.name,
  }));

  const apart = [
    {value: ApartmentMethod.House, name: 'Приватний будинок'},
    {value: ApartmentMethod.Apartment, name: 'Апартаменти'},
  ];

  const ids = Object.keys(cart || []);

  const total = ids.reduce((acc, id) => {
    return acc + cart?.[id].count * cart?.[id].price;
  }, 0);

  return (
    <View>
      <Header />
      <BackButtonScreen navigation={navigation} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Оформление заказа</Text>
          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'black'}}>1</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Введите данные
            </Text>
          </View>
          <View style={{marginTop: nh(15)}}>
            <Swiper
              options={shippingObj}
              value={deliveryMethodValue}
              onValueChange={setDeliveryMethodValue}
            />
          </View>
          {deliveryMethodValue === 'courier' ? (
            <View>
              <View style={{marginTop: nh(15)}}>
                <DropDown
                  placeholder="Выберите район доставки"
                  options={districts}
                />
              </View>
              <View style={{marginTop: nh(15), marginBottom: nh(15)}}>
                <Swiper
                  options={apart}
                  value={apartmentMethodValue}
                  onValueChange={setApartmentMethodValue}
                />
              </View>
              <View style={styles.houseInputs}>
                <View style={{width: nw(250)}}>
                  <InformationInput placeholder={'Вулиця'} inputMode={'text'} />
                </View>
                <View
                  style={{
                    width: nw(105),
                    marginLeft: nw(10),
                  }}>
                  <InformationInput
                    placeholder={'Будинок'}
                    inputMode={'text'}
                  />
                </View>
              </View>
              {apartmentMethodValue === ApartmentMethod.Apartment && (
                <View style={styles.apartmentInputs}>
                  <View style={{width: nw(114)}}>
                    <InformationInput
                      placeholder={'Квартира'}
                      inputMode={'text'}
                    />
                  </View>
                  <View style={{width: nw(115)}}>
                    <InformationInput
                      placeholder={"Під'їзд"}
                      inputMode={'text'}
                    />
                  </View>
                  <View style={{width: nw(115)}}>
                    <InformationInput
                      placeholder={'Поверх'}
                      inputMode={'numeric'}
                    />
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={{marginTop: nh(15)}}>
              <DropDown
                placeholder={'Оберіть найближчий заклад'}
                options={addressArray}
              />
            </View>
          )}
          <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
            <InformationInput placeholder="Имя" inputMode="text" />
          </View>
          <View style={styles.inputWrapper}>
            <InformationInput placeholder="Email" inputMode="email" />
          </View>
          <View style={styles.inputWrapper}>
            <InformationInput placeholder="Телефон" inputMode="tel" />
          </View>

          <View style={styles.inputWrapper}>
            <InformationInput
              placeholder="Комментарий к заказу"
              inputMode="text"
            />
          </View>
          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'black'}}>2</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Способ оплаты
            </Text>
          </View>
          <Swiper
            value={paymentMethodValue}
            onValueChange={setPaymentMethodValue}
            options={paymentObj}
          />

          <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
            {paymentMethodValue === 'cash' && (
              <InformationInput
                placeholder="Приготовить сдачу с"
                inputMode="text"
              />
            )}
          </View>
          <Text
            style={[
              styles.whiteText,
              {fontSize: 16, fontWeight: '500', marginTop: nh(30)},
            ]}>
            Сумма заказа
          </Text>
          <View style={styles.priceWrapper}>
            <Text style={styles.whiteText}>Доставка</Text>
            <Text style={styles.whiteText}>0 ₴</Text>
          </View>
          <View style={styles.verticalBar} />
          <View style={styles.priceWrapper}>
            <Text style={styles.whiteText}>К оплате</Text>
            <Text style={styles.whiteText}>{total} ₴</Text>
          </View>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.blackText}>Заказать</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  scrollView: {
    display: 'flex',
    alignItems: 'center',
  },
  houseInputs: {
    display: 'flex',
    flexDirection: 'row',
    width: nw(365),
  },
  apartmentInputs: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: nh(15),
    gap: 10,
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
    width: nw(365),
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
