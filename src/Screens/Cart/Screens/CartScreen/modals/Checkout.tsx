import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';
import * as yup from 'yup';

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

import Caret from '../../../../../assets/Icons/Caret.svg';
import {shippingQuery} from '../../../shipping.query.ts';
import {paymentQuery} from '../../../payment.query.ts';
import store from '../../../../../stores/store.ts';
import {observer} from 'mobx-react-lite';
import {cartQuery} from '../../../cart.query.ts';
import {Controller, useForm, useWatch} from 'react-hook-form';
import ForkKnife from '../../../../../assets/Icons/ForkKnife.svg';
import Counter from '../../../../../components/Counter/Counter.tsx';
import {yupResolver} from '@hookform/resolvers/yup';
import {isValidUkrainianPhone} from '../../../utils.ts';
import {agent} from '../../../../../../APIClient.tsx';
import {IDistrict} from '@layerok/emojisushi-js-sdk';
import {cityQuery} from '../../../../../components/Header/city.query.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';

enum HouseTypeEnum {
  Apartment = 'high_rise_building',
  House = 'private_house',
}
enum PaymentMethodEnum {
  Cash = 'cash',
  Card = 'card',
}
enum ShippingMethodEnum {
  Courier = 'courier',
  Takeaway = 'takeaway',
}

type FormValues = {
  shippingMethod: ShippingMethodEnum;
  paymentMethod: PaymentMethodEnum;
  spotId: number | undefined;
  districtId: number | undefined;
  name: string;
  phone: string;
  email: string;
  houseType: string;
  house: string;
  floor: string;
  street: string;
  apartment: string;
  entrance: string;
  comment: string;
  sticks: number;
  change: string;
};
const validationRequired = 'Заповніть це поле';

const getDistrictDefaultSpot = (district: IDistrict) => {
  return district.spots[0];
};

const Checkout = observer(({navigation}: {navigation: any}) => {
  const [requestLoading, setRequestLoading] = useState(false);
  const {data: spotsRes} = useQuery(spotsQuery);
  const {data: cityRes} = useQuery(cityQuery);
  const {data: cartRes} = useQuery(cartQuery);

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
  const spots = filteredAddresses.map(address => ({
    id: address.id,
    name: address.name,
  }));
  const cities = (cityRes || []).map(city => city);

  const city = cities.find(c => c.slug === store.city);
  const districts = (city?.districts || []).map(district => ({
    id: district.id,
    name: district.name,
  }));
  const apart = [
    {value: HouseTypeEnum.House, name: 'Приватний будинок'},
    {value: HouseTypeEnum.Apartment, name: 'Апартаменти'},
  ];

  const ids = Object.keys(cartRes || []);

  const total = ids.reduce((acc, id) => {
    return acc + cartRes?.[id].count * cartRes?.[id].price;
  }, 0);

  const TakeAwaySchema = yup.object({
    phone: yup
      .string()
      .required(validationRequired)
      .test(
        'is possible phone number',
        () => 'Телефон повинен бути у форматі +380xxxxxxxxx',
        isValidUkrainianPhone,
      ),
    spotId: yup.number().required(validationRequired),
  });
  const CourierSchema = yup.object({
    phone: yup
      .string()
      .required(validationRequired)
      .test(
        'is possible phone number',
        () => 'Телефон повинен бути у форматі +380xxxxxxxxx',
        isValidUkrainianPhone,
      ),
    street: yup.string().required(validationRequired),
    house: yup.string().required(validationRequired),
    districtId: yup.number().required(validationRequired),
  });
  const CourierHighRiseBuildingSchema = yup.object({
    phone: yup
      .string()
      .required(validationRequired)
      .test(
        'is possible phone number',
        () => 'Телефон повинен бути у форматі +380xxxxxxxxx',
        isValidUkrainianPhone,
      ),
    street: yup.string().required(validationRequired),
    house: yup.string().required(validationRequired),
    apartment: yup.string().required(validationRequired),
    entrance: yup.string().required(validationRequired),
    floor: yup.string().required(validationRequired),
    districtId: yup.number().required(validationRequired),
  });
  const InitialValue: FormValues = {
    shippingMethod: ShippingMethodEnum.Takeaway,
    spotId: spots.length === 1 ? spots[0].id : undefined,
    districtId: districts.length === 1 ? districts[0].id : undefined,
    paymentMethod: PaymentMethodEnum.Cash,
    name: '',
    phone: '',
    email: '',
    houseType: HouseTypeEnum.House,
    house: '',
    floor: '',
    street: '',
    apartment: '',
    entrance: '',
    comment: '',
    sticks: 0,
    change: '',
  };
  const getValidationSchema = (values: FormValues) => {
    if (
      values.houseType === HouseTypeEnum.Apartment &&
      values.shippingMethod === ShippingMethodEnum.Courier
    ) {
      return CourierHighRiseBuildingSchema;
    }
    if (values.shippingMethod === ShippingMethodEnum.Courier) {
      return CourierSchema;
    }
    return TakeAwaySchema;
  };
  const [validationSchema, setValidationSchema] = useState<
    | typeof TakeAwaySchema
    | typeof CourierSchema
    | typeof CourierHighRiseBuildingSchema
  >(getValidationSchema(InitialValue));

  const onChangeSwiperShippingSchema = (value: string) => {
    setValidationSchema(
      getValidationSchema({
        ...InitialValue,
        shippingMethod:
          ShippingMethodEnum.Takeaway === value
            ? ShippingMethodEnum.Takeaway
            : ShippingMethodEnum.Courier,
      }),
    );
  };

  const onChangeSwiperApartmentShippingSchema = (value: string) => {
    setValidationSchema(
      getValidationSchema({
        ...InitialValue,
        shippingMethod:
          ShippingMethodEnum.Takeaway === value
            ? ShippingMethodEnum.Takeaway
            : ShippingMethodEnum.Courier,
        houseType:
          HouseTypeEnum.House === value
            ? HouseTypeEnum.House
            : HouseTypeEnum.Apartment,
      }),
    );
  };
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: InitialValue,
    resolver: yupResolver<FormValues>(validationSchema),
  });
  const shippingMethod = useWatch({control, name: 'shippingMethod'});
  const paymentMethod = useWatch({control, name: 'paymentMethod'});
  const houseType = useWatch({control, name: 'houseType'});
  if (!cartRes) {
    throw new Error('Your cart is empty');
  }

  console.log(validationSchema._nodes);
  const items = ids.map(id => ({
    id: id,
    variant_id: undefined,
    quantity: +cartRes[id].count,
  }));
  const getSelectedDistrict = (id: number | undefined) => {
    console.log(id);
    const selected = districts.find(d => d.id === id);

    if (!selected) {
      return null;
    }
    return selected?.name;
  };
  const getSelectedSpot = (id: number | undefined) => {
    const selected = spots.find(d => d.id === id);
    if (!selected) {
      return null;
    }
    return selected?.name;
  };

  const onSubmit = async (data: FormValues) => {
    setRequestLoading(true);
    const {
      phone,
      floor,
      name,
      street,
      sticks,
      shippingMethod,
      spotId,
      house,
      paymentMethod,
      districtId,
      change,
      comment,
      entrance,
      email,
      apartment,
    } = data;
    const [firstname, lastname] = name.split(' ');
    const address = [
      ['Вулиця', street],
      ['Будинок', house],
      ['Квартира', apartment],
      ["Під'їзд", entrance],
      ['Поверх', floor],
    ]
      .filter(([_, value]) => !!value)
      .map(([label, value]) => `${label}: ${value}`)
      .join(', ');

    const paymentId = payment.find(p => p.code === paymentMethod);
    const shippingId = shipping.find(s => s.code === shippingMethod);
    if (!paymentId) {
      setRequestLoading(false);
      throw new Error('Payment method not found');
    }
    if (!shippingId) {
      setRequestLoading(false);
      throw new Error('Shiping method not found');
    }
    const district = city?.districts.find(d => d.id === districtId);
    if (shippingMethod === ShippingMethodEnum.Courier) {
      if (!district) {
        setRequestLoading(false);
        throw new Error('District not found');
      }
    }
    const resultantSpotId =
      shippingMethod === ShippingMethodEnum.Takeaway
        ? spotId
        : getDistrictDefaultSpot(district).id;
    if (!resultantSpotId) {
      setRequestLoading(false);
      throw new Error('Invalid spot ID');
    }
    try {
      const res = await agent.placeOrderV2({
        phone,
        email,
        firstname,
        lastname,

        address,
        payment_method_id: paymentId.id,
        shipping_method_id: shippingId.id,
        spot_id: resultantSpotId,

        change,
        comment,
        cart: {items},
        sticks: +sticks,
      });
      AsyncStorage.removeItem('cart');
      setRequestLoading(false);
      navigation.goBack();
      navigation.navigate('ThankYou');
    } catch (e) {
      if (e instanceof Error) {
        setRequestLoading(false);
        throw new Error(e.message);
      } else {
        setRequestLoading(false);
        throw new Error(`Unknown error ${e}`);
      }
    }
  };

  const spotError = errors.spotId?.message;
  const districtError = errors.districtId?.message;
  console.log();

  return (
    <View>
      <Spinner
        visible={requestLoading}
        textContent={'Loading...'}
        textStyle={{color: 'yellow'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Header />
      <BackButtonScreen navigation={navigation} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Оформление заказа</Text>
          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'black', lineHeight: nh(17)}}>1</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Введите данные
            </Text>
          </View>
          <Controller
            name="shippingMethod"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={{marginTop: nh(15)}}>
                <Swiper
                  options={shippingObj}
                  value={value}
                  onValueChange={value => {
                    onChangeSwiperShippingSchema(value);
                    onChange(value);
                  }}
                />
              </View>
            )}
          />

          {shippingMethod === ShippingMethodEnum.Courier ? (
            <View>
              {districts.length > 1 && (
                <Controller
                  name="districtId"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View
                      style={[
                        styles.dropDownContainer,
                        districtError ? styles.errorFocus : null,
                        {marginTop: nh(15), zIndex: 5},
                      ]}>
                      <DropDown
                        value={value}
                        placeholder={<Text>Выберите район доставки</Text>}
                        options={districts}
                        onChange={d => onChange(d)}
                        error={errors.districtId?.message}
                        snapPoints={'30'}>
                        <View style={styles.inputContainer}>
                          <Text style={styles.selectOption}>
                            {getSelectedDistrict(value) ? (
                              <Text style={styles.whiteText}>
                                {getSelectedDistrict(value)}
                              </Text>
                            ) : (
                              'Выберите район доставки'
                            )}
                          </Text>
                          <Caret color="#727272" width="15" />
                        </View>
                      </DropDown>
                    </View>
                  )}
                />
              )}

              <Controller
                name="houseType"
                control={control}
                render={({field: {onChange, value}}) => (
                  <View style={{marginTop: nh(15), marginBottom: nh(15)}}>
                    <Swiper
                      options={apart}
                      value={value}
                      onValueChange={v => {
                        onChangeSwiperApartmentShippingSchema(v);
                        onChange(v);
                      }}
                    />
                  </View>
                )}
              />

              <View style={styles.houseInputs}>
                <Controller
                  name="street"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View style={{width: nw(250), zIndex: 6}}>
                      <InformationInput
                        placeholder={'Вулиця'}
                        inputMode={'text'}
                        onChangeText={v => onChange(v)}
                        value={value}
                        error={errors.street?.message}
                      />
                    </View>
                  )}
                />

                <Controller
                  name="house"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <View
                      style={{
                        width: nw(105),
                        marginLeft: nw(10),
                        zIndex: 6,
                      }}>
                      <InformationInput
                        placeholder={'Будинок'}
                        inputMode={'text'}
                        onChangeText={v => onChange(v)}
                        value={value}
                        error={errors.house?.message}
                      />
                    </View>
                  )}
                />
              </View>
              {houseType === HouseTypeEnum.Apartment && (
                <View style={styles.apartmentInputs}>
                  <Controller
                    name="apartment"
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <View style={{width: nw(114), zIndex: 5}}>
                        <InformationInput
                          placeholder={'Квартира'}
                          inputMode={'text'}
                          onChangeText={v => onChange(v)}
                          value={value}
                          error={errors.apartment?.message}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="entrance"
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <View style={{width: nw(115), zIndex: 5}}>
                        <InformationInput
                          placeholder={"Під'їзд"}
                          inputMode={'text'}
                          value={value}
                          onChangeText={v => onChange(v)}
                          error={errors.entrance?.message}
                        />
                      </View>
                    )}
                  />
                  <Controller
                    name="floor"
                    control={control}
                    render={({field: {onChange, value}}) => (
                      <View style={{width: nw(115), zIndex: 5}}>
                        <InformationInput
                          placeholder={'Поверх'}
                          inputMode={'numeric'}
                          value={value}
                          onChangeText={v => onChange(v)}
                          error={errors.floor?.message}
                        />
                      </View>
                    )}
                  />
                </View>
              )}
            </View>
          ) : (
            spots.length > 1 && (
              <Controller
                name="spotId"
                control={control}
                render={({field: {onChange, value}}) => (
                  <View
                    style={[
                      styles.dropDownContainer,
                      spotError ? styles.errorFocus : null,
                      {marginTop: nh(15), zIndex: 5},
                    ]}>
                    <DropDown
                      value={value}
                      placeholder={<Text>Оберіть найближчий заклад</Text>}
                      options={spots}
                      onChange={s => onChange(s)}
                      snapPoints={'30'}
                      error={errors.spotId?.message}>
                      <View style={styles.inputContainer}>
                        <Text style={styles.selectOption}>
                          {getSelectedSpot(value) ? (
                            <Text style={styles.whiteText}>
                              {getSelectedSpot(value)}
                            </Text>
                          ) : (
                            'Оберіть найближчий заклад'
                          )}
                        </Text>
                        <Caret color="#727272" width="15" />
                      </View>
                    </DropDown>
                  </View>
                )}
              />
            )
          )}
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
                <InformationInput
                  placeholder="Имя"
                  inputMode="text"
                  value={value}
                  onChangeText={v => onChange(v)}
                />
              </View>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.inputWrapper}>
                <InformationInput
                  placeholder="Email"
                  inputMode="email"
                  value={value}
                  onChangeText={v => onChange(v)}
                />
              </View>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={[styles.inputWrapper, {zIndex: 5}]}>
                <InformationInput
                  placeholder="Телефон"
                  inputMode="tel"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.phone?.message}
                />
              </View>
            )}
          />
          <Controller
            name="comment"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.inputWrapper}>
                <InformationInput
                  placeholder="Комментарий к заказу"
                  inputMode="text"
                  value={value}
                  onChangeText={v => onChange(v)}
                />
              </View>
            )}
          />
          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'black', lineHeight: nh(17)}}>2</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Способ оплаты
            </Text>
          </View>
          <Controller
            name="paymentMethod"
            control={control}
            render={({field: {onChange, value}}) => (
              <Swiper
                value={value}
                onValueChange={onChange}
                options={paymentObj}
              />
            )}
          />

          <Controller
            name="change"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
                {paymentMethod === 'cash' && (
                  <InformationInput
                    placeholder="Приготовить сдачу с"
                    inputMode="text"
                    value={value}
                    onChangeText={v => onChange(v)}
                  />
                )}
              </View>
            )}
          />
          <Controller
            name="sticks"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.personCountWrapper}>
                <ForkKnife
                  width={nw(32)}
                  height={nw(32)}
                  style={styles.forkKnife}
                  color="white"
                />
                <Text style={styles.personText}>Количество персон?</Text>
                <View style={{marginLeft: nw(45)}}>
                  <Counter
                    count={Number(value)}
                    onHandleAdd={() => onChange(Number(value) + 1)}
                    onHandleMinus={() =>
                      onChange(Math.max(Number(value) - 1, 0))
                    }
                  />
                </View>
              </View>
            )}
          />
          <Text
            style={[
              styles.whiteText,
              {
                fontSize: nh(16),
                fontWeight: '500',
                marginTop: nh(30),
                marginBottom: nh(10),
              },
            ]}>
            Сумма заказа
          </Text>
          <View style={styles.verticalBar} />
          <View style={styles.priceWrapper}>
            <Text style={styles.whiteText}>К оплате</Text>
            <Text style={styles.whiteText}>{total} ₴</Text>
          </View>
          <TouchableOpacity
            style={styles.orderBtn}
            onPress={handleSubmit(onSubmit)}>
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
  errorFocus: {
    borderWidth: 1,
    borderColor: 'red',
  },
  apartmentInputs: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: nh(15),
    gap: 10,
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
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
    fontSize: nh(14),
    fontWeight: '400',
    lineHeight: 17,
    color: 'white',
  },
  personCountWrapper: {
    backgroundColor: '#1C1C1C',
    width: nw(365),
    height: nh(65),
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  buttonMinus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 35,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  forkKnife: {
    marginLeft: nw(15),
  },
  personText: {
    marginLeft: nw(15),
    color: 'white',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    lineHeight: 17,
    fontWeight: '400',
  },
  blackText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '700',
    lineHeight: 17,
    color: 'black',
  },
  greyText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
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
    fontSize: nh(14),
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  selectOption: {
    color: '#616161',
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    lineHeight: 17,
    fontWeight: '400',
  },
  dropDownContainer: {
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#272727',
    paddingLeft: nw(10),
    paddingRight: nw(10),
  },
});

export default Checkout;
