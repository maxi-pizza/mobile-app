import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import PasswordInput from '~/Screens/User/components/PasswordInput/PasswordInput.tsx';
import {Header, Input} from '~/components';

import {Controller, useForm, useWatch} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import {agent} from '~/../APIClient.tsx';

const validationRequired = 'Заповніть це поле';
const LoginSchema = yup.object({
  email: yup.string().email().required(validationRequired),
  password: yup.string(),
});
type FormValues = {
  email: string;
  password: string;
};
const InitialValue: FormValues = {
  email: '',
  password: '',
};

const SignInScreen = ({navigation}: {navigation: any}) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: InitialValue,
    resolver: yupResolver<FormValues>(
      // @ts-ignore
      LoginSchema,
    ),
  });
  const onSubmit = async (data: FormValues) => {
    const {email, password} = data;
    try {
      await agent.login({
        email,
        password,
      });
      navigation.goBack();
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(e.message);
      } else {
        throw new Error(`Unknown error ${e}`);
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.header}>Вход в аккаунт</Text>
      <View>
        {/* <Input placeholder={'Email'} inputMode={'email'} /> */}
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
        <View style={styles.password}>
          {/* <PasswordInput placeholder='Пароль' value='' /> */}
          <Controller
            name="password"
            control={control}
            render={({field: {onChange, value}}) => (
              <PasswordInput
                placeholder="Пароль"
                value={value}
                onChangeText={v => onChange(v)}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.textRight}>
        <Text
          onPress={() => navigation.navigate('ResetPassword')}
          style={styles.forgotPass}>
          Забыли пароль?
        </Text>
      </View>

      <TouchableOpacity
        style={styles.signInBtn}
        onPress={handleSubmit(
          // @ts-ignore
          onSubmit,
        )}>
        <Text style={styles.btnText}>Войти</Text>
      </TouchableOpacity>
      <View style={styles.textRight}>
        <Text style={styles.yellowText}>
          Нет аккаунта?{' '}
          <Text
            style={styles.forgotPass}
            onPress={() => navigation.navigate('SignUp')}>
            Регистрация
          </Text>
        </Text>
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
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
    lineHeight: 24,
    fontWeight: '600',
    color: 'white',
    marginTop: nh(30),
    marginBottom: nw(30),
  },
  password: {
    marginTop: nh(15),
  },
  forgotPass: {
    fontSize: nh(12),
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'MontserratRegular',
    color: 'yellow',
    textDecorationLine: 'underline',
  },
  textRight: {
    display: 'flex',
    alignItems: 'flex-end',
    width: nw(365),
    marginTop: nh(10),
  },
  signInBtn: {
    width: nw(365),
    height: nh(47),
    backgroundColor: '#FFE600',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: nh(15),
  },
  btnText: {
    color: 'black',
    fontFamily: 'MontserratRegular',
    fontSize: nh(15),
    fontWeight: '500',
  },
  yellowText: {
    fontSize: nh(12),
    fontWeight: '400',
    lineHeight: 14,
    fontFamily: 'MontserratRegular',
    color: 'yellow',
  },
});

export default SignInScreen;
