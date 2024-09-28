import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CartScreen from './Screens/CartScreen/CartScreen.tsx';
import CheckoutWithoutAccount from './Screens/CartScreen/modals/CheckoutWithoutAccount.tsx';


type ScreenProps = {
  CartScreen: undefined;
  CheckoutWithoutAccount: undefined;
}



const Stack = createStackNavigator<ScreenProps>();

const CartNavigation = () => {

  const stackOptions = {
    headerShown: false,
    animationEnabled: false,
  };

  return (
      <Stack.Navigator
          initialRouteName="CartScreen"
      >
        <Stack.Group screenOptions={stackOptions}>
          <Stack.Screen name="CartScreen" component={CartScreen}/>
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal', headerShown: false,animationTypeForReplace: 'push'}}>
          <Stack.Screen name="CheckoutWithoutAccount"
                        component={CheckoutWithoutAccount}
          />
        </Stack.Group>
      </Stack.Navigator>
  );
};

export default CartNavigation;
