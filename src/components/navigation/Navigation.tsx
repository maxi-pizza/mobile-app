import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, TouchableOpacity } from 'react-native';
import Heart from '../../assets/Icons/Heart.svg';
import HomeButton from '../HomeButton/HomeButton';
import Cart from '../../assets/Icons/Cart.svg';
import User from '../../assets/Icons/User.svg';
import Category from '../../assets/Icons/Category.svg';

type RootTabParams = {
  Home: undefined;
  Favourite: undefined;
  Cart: undefined;
  Category: undefined;
  User: undefined;
}

function HomeScreen() {
  return (
      <View>
        <Text>HomeScreen</Text>
      </View>
  );
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
  return (
      <Tab.Navigator
          screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({focused}) => {
              const icons = {
                Home: HomeButton,
                Favourite: Heart,
                Cart: Cart,
                Category: Category,
                User: User,
              };

              const IconComponent = icons[route.name];
              console.log(IconComponent, route.name);
              const onPress = () => {
                navigation.navigate(route.name);
              };
              return IconComponent ? (
                  <TouchableOpacity onPress={onPress}><IconComponent color={focused ? 'yellow' : 'white'}/></TouchableOpacity>
              ) : undefined;
            },
            tabBarActiveTintColor: 'yellow',
            tabBarInactiveTintColor: 'white',
            tabBarShowLabel: false,
            tabBarStyle: {
              height: 80,
              backgroundColor: '#171717',

            },
          })}
      >
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Category" component={CategoryScreen} />
        <Tab.Screen name="User" component={UserScreen} />

      </Tab.Navigator>
  );
};
