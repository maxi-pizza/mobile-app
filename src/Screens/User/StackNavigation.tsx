import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import UserScreen from './Screens/UserScreen/UserScreen.tsx';
import ContactsScreen from './Screens/ContactsScreen/ContactsScreen.tsx';
import SignInScreen from './Screens/SignInScreen/SignInScreen.tsx';
import SignUpScreen from './Screens/SignUpScreen/SignUpScreen.tsx';
import ResetPasswordScreen from './Screens/ResetPasswordScreen/ResetPasswordScreen.tsx';
import OrderHistoryScreen from './Screens/OrderHistoryScreen/OrderHistoryScreen.tsx';
import SavedAddressesScreen from './Screens/SavedAddressesScreen/SavedAddressesScreen.tsx';
import DeliveryAndPayment from './Screens/DeliveryAndPayment/DeliveryAndPayment.tsx';
import RefundRules from './Screens/RefundRules/RefundRules.tsx';

type ScreenProps = {
  Profile: undefined;
  OrderHistory: undefined;
  UserScreen: undefined;
  SavedAddresses: undefined;
  DeliveryAndPayment: undefined;
  RefundRules: undefined;
  Contacts: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<ScreenProps>();

const StackNavigation = () => {
  const stackOptions = {
    headerShown: false,
    animationEnabled: false,
  };

  return (
    <Stack.Navigator screenOptions={stackOptions} initialRouteName="UserScreen">
      <Stack.Screen name="UserScreen" component={UserScreen} />
      <Stack.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="DeliveryAndPayment"
        component={DeliveryAndPayment}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="RefundRules"
        component={RefundRules}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{
          gestureEnabled: true,
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
