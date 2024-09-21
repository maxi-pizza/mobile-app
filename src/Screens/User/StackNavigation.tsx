import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import UserScreen from './UserScreen.tsx';

type ScreenProps = {
  Profile: undefined;
  OrderHistory: undefined;
  UserScreen: undefined;
  SavedAddresses: undefined;
  DeliveryAndPayment: undefined;
  RefundRules: undefined;
  Contacts: undefined;
}


function OrderHistory({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}
function SavedAddresses({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}
function DeliveryAndPayment({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}
function RefundRules({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}
function Profile({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}
function Contacts({navigation}: {navigation: any}) {
  return (
      <View>
        <Text><TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Назад</Text>
        </TouchableOpacity></Text>
      </View>
  );
}


const Stack = createStackNavigator<ScreenProps>();

const StackNavigation = () => {

  const options = {
    headerShown: false,
  };

  return (
      <Stack.Navigator
          screenOptions={options}
          initialRouteName="UserScreen"
      >
        <Stack.Screen name="UserScreen" component={UserScreen}/>
        <Stack.Screen name="OrderHistory" component={OrderHistory}/>
        <Stack.Screen name="SavedAddresses" component={SavedAddresses}/>
        <Stack.Screen name="DeliveryAndPayment" component={DeliveryAndPayment}/>
        <Stack.Screen name="RefundRules" component={RefundRules}/>
        <Stack.Screen name="Profile" component={Profile}/>
        <Stack.Screen name="Contacts" component={Contacts}/>
      </Stack.Navigator>
  );
};

export default StackNavigation;
