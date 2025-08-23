import React from 'react';
import HomeButton from '~/components/HomeButton/HomeButton.tsx';
import Heart from '~/assets/Icons/Heart.svg';
import Category from '~/assets/Icons/Category.svg';
import User from '~/assets/Icons/User.svg';
import {TouchableOpacity} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import CartBottomTab from '~/components/CartBottomTab/CartBottomTab.tsx';

type TabBarIconProps = {
  routeName: 'HomeNavigation' | 'Favourite' | 'Cart' | 'Category' | 'User';
  focused: boolean;
  navigation: NavigationProp<any>;
};

const TabBarIcon: React.FC<TabBarIconProps> = ({
  routeName,
  focused,
  navigation,
}) => {
  const icons = {
    HomeNavigation: HomeButton,
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
      <IconComponent color={focused ? 'rgb(225, 43, 23)' : 'white'} />
    </TouchableOpacity>
  ) : null;
};

export default TabBarIcon;
