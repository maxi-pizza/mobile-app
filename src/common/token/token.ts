import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async (token: string) => {
  await AsyncStorage.setItem('jwtToken', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('jwtToken');
};

export const clearToken = async () => {
  await AsyncStorage.removeItem('jwtToken');
};
