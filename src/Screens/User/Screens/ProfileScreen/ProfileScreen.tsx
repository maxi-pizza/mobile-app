import {IUser} from '~/api/types';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {agent} from '~/../APIClient';
import {nh, nw} from '~/common/normalize.helper.ts';
import * as yup from 'yup';

import {Header, Input, BackButtonModal} from '~/components';
import {yupResolver} from '@hookform/resolvers/yup';
import axios, {AxiosError} from 'axios';
import {clearToken} from '~/common/token/token';
import {Navigation} from '~/components/navigation/Navigation';
import UpdatePasswordScreen from '../UpdatePasswordScreen/UpdatePasswordScreen';

const validationRequired = 'Заповніть це поле';
const UserInfoSchema = yup.object({
  name: yup.string().min(2).required(validationRequired),
  surname: yup.string().min(2).required(validationRequired),
  email: yup.string().email().min(6).max(255).required(validationRequired),
  phone: yup.string().min(6),
});
type FormValues = {
  name: string;
  surname: string;
  email: string;
  phone: string;
};
const InitialValue: FormValues = {
  name: '',
  surname: '',
  email: '',
  phone: '',
};

const ProfileScreen = ({
  visible,
  setIsVisible,
  navigation,
}: {
  visible: boolean;
  setIsVisible: (a: boolean) => void;
  navigation: any;
}) => {
  const [isRecovery, setIsRecovery] = useState(false);
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    setError,
  } = useForm({
    defaultValues: InitialValue,
    resolver: yupResolver<FormValues>(
      // @ts-ignore
      UserInfoSchema,
    ),
  });

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      return (await agent.fetchUser()).data;
    },
  });
  const {mutate: updateUser, isLoading: isSaving} = useMutation({
    mutationFn: (data: FormValues) => agent.updateUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['userData']);
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
            if (key === 'phone') {
              setError('phone', {
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
  const onSubmit = (data: FormValues) => {
    updateUser(data);
  };
  useEffect(() => {
    setValue('name', user?.name ?? '');
    setValue('surname', user?.surname ?? '');
    setValue('email', user?.email ?? '');
    setValue('phone', user?.phone ?? '');
  }, [user]);
  return (
    <>
      <Modal visible={visible} onRequestClose={() => setIsVisible(!visible)}>
      {isRecovery && <UpdatePasswordScreen></UpdatePasswordScreen>}
        <View style={styles.container}>
          <Spinner
            visible={isLoading || isSaving}
            textContent={'Loading...'}
            textStyle={{color: 'yellow'}}
            overlayColor="rgba(0, 0, 0, 0.75)"
          />
          <Header />
          <View style={styles.backButton}>
            <BackButtonModal setIsVisible={setIsVisible} visible={visible} />
          </View>
          <ScrollView>
            <Text style={styles.header}>Профиль</Text>
            <View style={styles.inputsWrapper}>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.inputLabel}>Имя</Text>
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
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.inputLabel}>Фамилия</Text>
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
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <Controller
                  name="email"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="Email"
                      inputMode="text"
                      value={value}
                      onChangeText={onChange}
                      error={errors.email?.message}
                      editable={false}
                    />
                  )}
                />
                {/* <Input placeholder="Введите Email" inputMode="email" /> */}
              </View>
              <View style={styles.inputTextWrapper}>
                <Text style={styles.inputLabel}>Телефон</Text>
                <Controller
                  name="phone"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <Input
                      placeholder="phone"
                      inputMode="text"
                      value={value}
                      onChangeText={onChange}
                      error={errors.phone?.message}
                    />
                  )}
                />
                {/* <Input placeholder="Введите телефон" inputMode="tel" /> */}
              </View>
              <TouchableOpacity
                style={styles.btnChangePass}
                onPress={() => {
                  setIsRecovery(true);
                }}>
                <Text style={styles.changePassText}>Изменить пароль</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveBtn}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.btnText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
    width: '100%',
    paddingHorizontal: nw(12),
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
    marginBottom: nh(15),
    textAlign: 'center',
  },
  inputsWrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  footer: {
    backgroundColor: '#171717',
    width: '100%',
    height: nh(80),
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtn: {
    width: nw(345),
    height: nh(44),
    backgroundColor: '#FFE600',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    lineHeight: 17,
    fontWeight: '500',
    color: 'black',
  },
  inputTextWrapper: {
    marginBottom: nh(15),
    width: '100%',
  },
  inputLabel: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '400',
    lineHeight: 17,
    color: '#616161',
    marginBottom: nh(7),
  },
  btnChangePass: {
    width: nw(365),
    height: nh(44),
    borderRadius: 10,
    backgroundColor: '#FFE60099',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePassText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '500',
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    left: 0,
  },
});

export default ProfileScreen;
