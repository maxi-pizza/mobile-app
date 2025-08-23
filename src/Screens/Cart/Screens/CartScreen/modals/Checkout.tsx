import React, { useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import * as yup from 'yup';

import Swiper from '../components/Swiper.tsx';
import {Input, Counter, Header, BackButton} from '~/components';

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {spotsQuery} from '~/Screens/Cart/spots.query.ts';

import Truck from '~/assets/Icons/Truck.svg';
import Package from '~/assets/Icons/Package.svg';
import Card from '~/assets/Icons/CreditCard.svg';
import Cash from '~/assets/Icons/Money.svg';
import ForkKnife from '~/assets/Icons/ForkKnife.svg';

import {shippingQuery} from '~/Screens/Cart/shipping.query.ts';
import {paymentQuery} from '~/Screens/Cart/payment.query.ts';
import {observer} from 'mobx-react-lite';
import {CART_STORAGE_KEY, cartQuery} from '~/Screens/Cart/cart.query.ts';
import {Controller, useForm, useWatch} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {isValidUkrainianPhone} from '../../../utils.ts';
import {agent} from '~/../APIClient.tsx';
import {bonusOptionsQuery} from '~/common/queries/bonusOptions.query.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import {nh, nw} from '~/common/normalize.helper.ts';

import axios, {AxiosError} from 'axios';

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
  spotId?: number | undefined;
  districtId?: number | undefined;
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
  bonusesToUse: string | null;
};
const validationRequired = 'Заповніть це поле';


const Checkout = observer(({navigation}: {navigation: any}) => {
  const {data: spotsRes} = useQuery(spotsQuery);
  const {data: bonusOptions} = useQuery(bonusOptionsQuery);
  const queryClient = useQueryClient();
  const [logged, setLogged] = useState(false);
  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const data = await agent.fetchUser();
      return data.data;
    },
    retry: false,
    onSuccess: async fetchedUser => {
      setLogged(true);
      if (!fetchedUser) return;
      setValue('email', fetchedUser?.email);
      setValue('phone', fetchedUser?.phone ?? '');
      setValue('name', fetchedUser?.name ?? '');
    },
    onError: () => {
      setLogged(false);
    },
  });
  useEffect(() => {
    if (user) {
      setLogged(true);
    }
  }, [user]);
  const {data: cartRes} = useQuery(cartQuery());

  const {data: shippingRes} = useQuery(shippingQuery);
  const {data: paymentRes} = useQuery(paymentQuery);
  const shippings = (shippingRes?.data || []).map(ship => ship);
  const shippingIcons = [Package, Truck];
  const shippingObj = shippings.map((item, index) => ({
    value: item.code,
    name: item.name,
    icon: shippingIcons[index],
  }));

  const paymentIcons = [Cash, Card];
  const payments = (paymentRes?.data || []).map(item => item);
  const paymentObj = payments.map((item, index) => ({
    value: item.code,
    name: item.name,
    icon: paymentIcons[index],
  }));

  const spots = (spotsRes || []).map(spot => spot);




  const apart = [
    {value: HouseTypeEnum.House, name: 'Приватний будинок'},
    {value: HouseTypeEnum.Apartment, name: 'Апартаменти'},
  ];

  const ids = Object.keys(cartRes || []);

  const total = ids.reduce((acc, id) => {
    return acc + cartRes?.[id].count * cartRes?.[id].price;
  }, 0);
  interface ValidationContext {
    user?: {
      bonus_amount: number;
    };
  }
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
    bonusesToUse: yup
      .string()
      .nullable()
      .test('max-bonus', 'Недостатньо бонусів', function (value) {
        const {user} = (this.options?.context as ValidationContext) ?? null;
        const max = user?.bonus_amount ?? 0;
        if (user === null || user === undefined) {
          return true;
        }
        if (value === null || value === undefined) {
          return true;
        }
        return +value <= max && +value >= 0;
      }),
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
    bonusesToUse: yup
      .string()
      .nullable()
      .test('max-bonus', 'Недостатньо бонусів', function (value) {
        const {user} = (this.options?.context as ValidationContext) ?? null;
        const max = user?.bonus_amount ?? 0;
        if (user === null || user === undefined) {
          return true;
        }
        if (value === null || value === undefined) {
          return true;
        }
        return +value <= max && +value >= 0;
      }),
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
    bonusesToUse: yup
      .string()
      .nullable()
      .test('max-bonus', 'Недостатньо бонусів', function (value) {
        const {user} = (this.options?.context as ValidationContext) ?? null;
        const max = user?.bonus_amount ?? 0;
        if (user === null || user === undefined) {
          return true;
        }
        if (value === null || value === undefined) {
          return true;
        }
        return +value <= max && +value >= 0;
      }),
  });
  const InitialValue: FormValues = {
    shippingMethod: ShippingMethodEnum.Takeaway,
    spotId: 1,
    districtId: undefined,
    paymentMethod: PaymentMethodEnum.Cash,
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    email: user?.email ?? '',
    houseType: HouseTypeEnum.House,
    house: '',
    floor: '',
    street: '',
    apartment: '',
    entrance: '',
    comment: '',
    sticks: 0,
    change: '',
    bonusesToUse: null,
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
    setError,
    setValue,
  } = useForm<FormValues>({
    defaultValues: InitialValue,
    resolver: yupResolver<FormValues>(
      // @ts-ignore
      validationSchema,
    ),
    context: {user},
  });

  const bonusesToUse = useWatch({control, name: 'bonusesToUse'});
  const shippingMethod = useWatch({control, name: 'shippingMethod'});
  const paymentMethod = useWatch({control, name: 'paymentMethod'});
  const houseType = useWatch({control, name: 'houseType'});
  if (!cartRes || Object.keys(cartRes).length < 1) {
    navigation.navigate('CartScreen');
    return null;
  }

  const items = ids.map(id => ({
    id: id,
    variant_id: undefined,
    quantity: +cartRes[id].count,
  }));


  const {mutate: orderMutation, isLoading: isSending} = useMutation({
    mutationFn: async (data: FormValues) => {
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
        change,
        comment,
        entrance,
        email,
        apartment,
        bonusesToUse,
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

      const paymentId = payments?.find(p => p.code === paymentMethod);
      const shippingId = shippings.find(s => s.code === shippingMethod);


      const resultantSpotId = spotId;

      await agent.placeOrderV2({
        phone,
        email,
        firstname,
        lastname,

        address,
        payment_method_id: paymentId!.id,
        shipping_method_id: shippingId!.id,
        spot_id: resultantSpotId!,

        change,
        comment,
        cart: {items},
        sticks: +sticks,
        ...(bonusesToUse != null && {bonuses_to_use: +bonusesToUse}),
      });
    },
    onSuccess: async () => {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
      await queryClient.invalidateQueries(['userData']);
      navigation.goBack();
      navigation.navigate('ThankYou');
    },
    onError: e => {
      if (axios.isAxiosError(e)) {
        let error = e as AxiosError<{
          message: string;
          errors?: Record<string, string[]>;
        }>;
        const fieldErrors = error.response?.data.errors;

        if (fieldErrors) {
          Object.keys(fieldErrors).forEach(key => {
            switch (key) {
              case 'firstname': {
                setError('name', {
                  message: fieldErrors[key][0],
                });
                break;
              }
              default: {
                setError(key as keyof FormValues, {
                  message: fieldErrors[key][0],
                });
              }
            }
          });
        }
      } else {
        throw new Error(`Unknown error ${e}`);
      }
    },
  });
  const onSubmit = async (data: FormValues) => {
    orderMutation(data);
  };


  const bonusAmount = useMemo(() => {
    if (!bonusOptions) return;
    const rate = bonusOptions.bonus_rate;
   // const max = bonusOptions.max_bonus;
    const b = bonusOptions.get_bonus_from_used_bonus;
    console.log(b)
    let dif = 0;
    if (!b) {
      dif = +(bonusesToUse ?? 0);
    }
    const amount = (total - dif) * rate;
    return Math.floor(amount);
  }, [bonusOptions, bonusesToUse, total]);

  return (
    <View>
      <Spinner
        visible={isSending || isLoading}
        textContent={'Loading...'}
        textStyle={{color: 'rgb(225, 43, 23)'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Header />
      <BackButton navigation={navigation} />
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Оформлення замовлення</Text>
          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'white', lineHeight: nh(17)}}>1</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Введіть дані
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

          {shippingMethod === ShippingMethodEnum.Courier && (
            <View style={{
              position: 'relative',
              zIndex: 2,
            }}>
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
                      <Input
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
                      <Input
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
                        <Input
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
                        <Input
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
                        <Input
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
          )}
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={[styles.inputWrapper, {marginTop: nh(15)}]}>
                <Input
                  placeholder="Ім'я"
                  inputMode="text"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.name?.message}
                />
              </View>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={styles.inputWrapper}>
                <Input
                  placeholder="Email"
                  inputMode="email"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.email?.message}
                  editable={!logged}
                />
              </View>
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({field: {onChange, value}}) => (
              <View style={[styles.inputWrapper, {zIndex: 5}]}>
                <Input
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
                <Input
                  placeholder="Коментар до замовлення"
                  inputMode="text"
                  value={value}
                  onChangeText={v => onChange(v)}
                />
              </View>
            )}
          />
          {!!bonusOptions?.bonus_enabled && (
            <Controller
              name="bonusesToUse"
              control={control}
              render={({field: {onChange, value}}) => (
                <View style={styles.inputWrapper}>
                  <Input
                    placeholder={
                      logged
                        ? `Бонуси для використання (баланс: ${user?.bonus_amount})`
                        : 'Бонуси (тільки для зареєстрованих користувачів)'
                    }
                    inputMode="numeric"
                    value={value?.toString() ?? ''}
                    onChangeText={v => onChange(v)}
                    editable={logged}
                    error={errors.bonusesToUse?.message}
                  />
                </View>
              )}
            />
          )}

          <View style={styles.textWrapper}>
            <View style={styles.circle}>
              <Text style={{color: 'white', lineHeight: nh(17)}}>2</Text>
            </View>
            <Text style={[styles.greyText, {marginLeft: nw(15)}]}>
              Спосіб оплати
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
                  <Input
                    placeholder="Приготувати здачу з"
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
                <Text style={styles.personText}>Кількість персон?</Text>
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
            Сума замовлення
          </Text>
          <View style={styles.verticalBar} />
          <View style={styles.priceWrapper}>
            <Text style={styles.whiteText}>Сума замовлення</Text>
            <Text style={styles.whiteText}>{total} ₴</Text>
          </View>
          {+(bonusesToUse ?? 0) > 0 && (
            <View style={styles.priceWrapper}>
              <Text style={styles.whiteText}>
                Використано {bonusesToUse} бонусів
              </Text>
              <Text style={styles.whiteText}>-{bonusesToUse} ₴</Text>
            </View>
          )}
          <View style={styles.priceWrapper}>
            <Text style={styles.whiteText}>До оплати</Text>
            <Text style={styles.whiteText}>
              {total - +(bonusesToUse ?? 0)} ₴
            </Text>
          </View>
          {logged && !!bonusAmount && !!bonusOptions?.bonus_enabled && (
            <View style={styles.priceWrapper}>
              <Text style={styles.whiteText}>
                Буде отримано {bonusAmount} бонусів
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.orderBtn}
            onPress={() => {
              handleSubmit(onSubmit)();
            }}>
            <Text style={styles.blackText}>Замовити</Text>
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
    color: 'white',
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
    backgroundColor: 'rgb(225, 43, 23)',
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
    backgroundColor: 'rgb(225, 43, 23)',
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
