import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from './Screens/CartScreen/CartScreen.tsx';
import Checkout from './Screens/CartScreen/modals/Checkout.tsx';

type ScreenProps = {
  CartScreen: undefined;
  Checkout: undefined;
};

const Stack = createStackNavigator<ScreenProps>();

const CartNavigation = () => {
  const stackOptions = {
    headerShown: false,
    animationEnabled: false,
  };

  return (
    <Stack.Navigator initialRouteName="CartScreen">
      <Stack.Group screenOptions={stackOptions}>
        <Stack.Screen name="CartScreen" component={CartScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="Checkout" component={Checkout} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default CartNavigation;
