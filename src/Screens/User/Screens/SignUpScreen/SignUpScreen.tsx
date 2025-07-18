import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import PasswordInput from '~/Screens/User/components/PasswordInput/PasswordInput.tsx';

import {Header, Input, CheckBox} from '~/components';

import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios, {AxiosError} from 'axios';

import {agent} from '~/../APIClient.tsx';
import {useMutation} from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { setToken } from '~/common/token/token';

const validationRequired = 'Заповніть це поле';
const RegisterSchema = yup.object({
  name: yup.string().min(2).required(validationRequired),
  surname: yup.string().min(2).required(validationRequired),
  email: yup.string().email().min(6).max(255).required(validationRequired),
  password: yup.string().min(8).max(255).required(validationRequired),
  agree: yup.boolean().isTrue(validationRequired),
});
type FormValues = {
  name: string;
  surname: string;
  email: string;
  password: string;
  agree: boolean;
};
const InitialValue: FormValues = {
  name: '',
  surname: '',
  email: '',
  password: '',
  agree: false,
};

const SignUpScreen = ({navigation}: {navigation: any}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
    setError,
  } = useForm({
    defaultValues: InitialValue,
    resolver: yupResolver<FormValues>(
      // @ts-ignore
      RegisterSchema,
    ),
  });
  const {mutate: registerMutation, isLoading} = useMutation({
    mutationFn: async (data: FormValues) => {
      const {email, password, name, surname, agree} = data;
      return await agent.register({
        email,
        password,
        password_confirmation: password,
        name,
        surname,
        activate: true,
        auto_login: true,
        agree,
      });
    },
    onSuccess: (data) => {
      const {token} = data.data.data;
      setToken(token);
      navigation.goBack();
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
            if (key === 'email') {
              setError('email', {
                message: fieldErrors[key][0],
              });
            }
          });
        }
      } else {
        throw new Error(`Unknown error ${e}`);
      }
    },
  });
  const onSubmit = async (data: FormValues) => {
    registerMutation(data);
  };
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={'Loading...'}
        textStyle={{color: 'yellow'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Header />
      <Text style={styles.header}>Регистрация</Text>
      <View>
        <View style={styles.inputMargin}>
          <Controller
            name="name"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Имя"
                inputMode="text"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.name?.message}
              />
            )}
          />
          {/* <Input placeholder={'Имя'} inputMode={'text'} /> */}
        </View>
        <View style={styles.inputMargin}>
          <Controller
            name="surname"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Фамилия"
                inputMode="text"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.surname?.message}
              />
            )}
          />
          {/* <Input placeholder={'Фамилия'} inputMode={'text'} /> */}
        </View>
        <View style={styles.inputMargin}>
          <Controller
            name="email"
            control={control}
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Email"
                inputMode="email"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.email?.message}
              />
            )}
          />
          {/* <Input placeholder={'Email'} inputMode={'email'} /> */}
        </View>
        <View style={styles.inputMargin}>
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, value}}) => (
              <PasswordInput
                placeholder="Пароль"
                value={value}
                onChangeText={v => onChange(v)}
                error={errors.password?.message}
              />
            )}
          />
          {/* <PasswordInput /> */}
        </View>
        <Controller
          name="agree"
          control={control}
          render={({field: {onChange, value}}) => (
            <View style={styles.agreementWrapper}>
              <CheckBox active={value} onChange={onChange}></CheckBox>
              <Text style={styles.agreementText}>
                Я согласен с условиями использования и обработки моих
                персональных данных
              </Text>
              {errors.agree?.message && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{errors.agree?.message}</Text>
                </View>
              )}
            </View>
          )}
        />
        {/* <CheckBox /> */}

        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Регистрация</Text>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.yellowText}>
            Уже есть аккаунт?
            <Text
              onPress={() => navigation.navigate('SignIn')}
              style={styles.link}>
              Войти
            </Text>
          </Text>
        </View>
      </View>
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
  errorContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'rgb(205, 56, 56)',
    position: 'absolute',
    right: 0,
    top: 20,
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    color: 'white',
    fontWeight: '500',
  },
});

export default SignUpScreen;
