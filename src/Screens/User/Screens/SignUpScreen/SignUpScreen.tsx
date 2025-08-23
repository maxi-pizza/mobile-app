import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import PasswordInput from '~/Screens/User/components/PasswordInput/PasswordInput.tsx';

import {Header, Input, BackButton} from '~/components';

import {Controller, useForm} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios, {AxiosError} from 'axios';

import {agent} from '~/../APIClient.tsx';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {setToken} from '~/common/token/token';

const validationRequired = 'Заповніть це поле';
const RegisterSchema = yup.object({
  name: yup.string().min(2).required(validationRequired),
  phone: yup.string().required(validationRequired),
  email: yup.string().email().min(6).max(255).required(validationRequired),
  password: yup.string().min(8).max(255).required(validationRequired),
});
type FormValues = {
  name: string;
  email: string;
  password: string;
  phone: string;
};
const InitialValue: FormValues = {
  name: '',
  phone: '',
  email: '',
  password: '',
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
  const queryClient = useQueryClient();

  const {mutate: registerMutation, isLoading} = useMutation({
    mutationFn: async (data: FormValues) => {
      const {email, password, name, phone} = data;
      return (await agent.auth.register({
        email,
        password,
        password_confirmation: password,
        name,
        phone
      })).data;
    },
    onSuccess: async data => {
      queryClient.invalidateQueries(['userData']);
      const {token} = data;
      await setToken(token);
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
            // @ts-ignore
            setError(key, {
              message: fieldErrors[key][0],
            });
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
        textStyle={{color: 'white'}}
        overlayColor="rgba(0, 0, 0, 0.75)"
      />
      <Header />
      <BackButton navigation={navigation} />
      <View style={{
        display: 'flex',
        alignItems: 'center',
      }}>
        <Text style={styles.header}>Регістрація</Text>
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
              name="phone"
              control={control}
              render={({field: {onChange, value}}) => (
                <Input
                  placeholder="Телефон"
                  inputMode="text"
                  value={value}
                  onChangeText={v => onChange(v)}
                  error={errors.phone?.message}
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

          <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Регістрація</Text>
          </TouchableOpacity>
          <View style={styles.textWrapper}>
            <Text style={styles.yellowText}>
              Вже маєте обліковий запис?
              <Text
                onPress={() => navigation.navigate('SignIn')}
                style={styles.link}>
                Увійти
              </Text>
            </Text>
          </View>
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
    position: 'relative',
  },
  check: {
    width: nw(50),
  },
  btn: {
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: 'rgb(225, 43, 23)',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: nh(20),
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    fontSize: nh(15),
    color: 'white',
  },
  yellowText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(12),
    color: 'white',
  },
  link: {
    textDecorationLine: 'underline',
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: nh(10),
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
