import React from 'react';
import HomeButton from '../HomeButton/HomeButton.tsx';
import Heart from '../../assets/Icons/Heart.svg';
import Category from '../../assets/Icons/Category.svg';
import User from '../../assets/Icons/User.svg';
import {TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import CartBottomTab from '../CartBottomTab/CartBottomTab.tsx';

type TabBarIconProps = {
  routeName: 'Home' | 'Favourite' | 'Cart' | 'Category' | 'User';
  focused: boolean;
  navigation: NavigationProp<any>;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({
  routeName,
  focused,
  navigation,
}) => {
  const icons = {
    Home: HomeButton,
    Favourite: Heart,
    Cart: () => <CartBottomTab focused={focused} />,
    Category: Category,
    User: User,
  };

  const IconComponent = icons[routeName];

  const onPress = () => {
    navigation.navigate(routeName);
  };

  return IconComponent ? (
    <TouchableOpacity onPress={onPress} onLongPress={onPress}>
      <IconComponent color={focused ? 'yellow' : 'white'} />
    </TouchableOpacity>
  ) : null;
};

export default TabBarIcon;
