import React, {useCallback} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import {RouteProp} from '@react-navigation/core/src/types.tsx';
import {nh} from '../../../normalize.helper.ts';

import TabBarIcon from '../TabBarIcon/TabBarIcon.tsx';
import HomeScreen from '../../Screens/HomeScreen/HomeScreen.tsx';

type RootTabParams = {
  Home: undefined;
  Favourite: undefined;
  Cart: undefined;
  Category: undefined;
  User: undefined;
}


function CartScreen() {
  return (
      <View>
        <Text>CartScreen</Text>
      </View>
  );
}

function CategoryScreen() {
  return (
      <View>
        <Text>CategoryScreen</Text>
      </View>
  );
}

function UserScreen() {
  return (
      <View>
        <Text>UserScreen</Text>
      </View>
  );
}

function FavouriteScreen() {
  return (
      <View>
        <Text>FavouriteScreen</Text>
      </View>
  );
}


const Tab = createBottomTabNavigator<RootTabParams>();

export const Navigation = () => {

  const getOptions = useCallback(({ route, navigation }: {route: RouteProp<{ Favourite: any; Home: any; Cart: any; Category: any; User: any}>; navigation: any;}) => ({
    // eslint-disable-next-line react/no-unstable-nested-components
    tabBarIcon: ({focused}: {focused: boolean}) => {
      return <TabBarIcon routeName={route.name} focused={focused} navigation={navigation}/>;
    },
    header: () => {
      return false;
    },
    tabBarActiveTintColor: 'yellow',
    tabBarInactiveTintColor: 'white',
    tabBarShowLabel: false,
    tabBarStyle: {
      height: nh(80),
      backgroundColor: '#171717',
    },
  }), []);
  return (
      <Tab.Navigator
          screenOptions = {getOptions}
      >
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Category" component={CategoryScreen} />
        <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
  );
};
