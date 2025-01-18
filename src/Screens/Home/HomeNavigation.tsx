import HomeScreen from '~/Screens/Home/Screens/HomeScreen/HomeScreen.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import ProductModal from '~/Screens/Home/Screens/Modals/ProductModal.tsx';
import SearchModal from '~/Screens/Home/Screens/Modals/SearchModal.tsx';
import ThankYou from '~/Screens/Cart/Screens/CartScreen/ThankYou.tsx';

type ScreenProps = {
  Home: undefined;
  ProductModal: undefined;
  SearchModal: undefined;
  ThankYou: undefined;
};
const HomeNavigation = () => {
  const Stack = createStackNavigator<ScreenProps>();
  const stackOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group screenOptions={stackOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ThankYou" component={ThankYou} />
      </Stack.Group>
      <div>
        <div></div>
      </div>

      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen name="ProductModal" component={ProductModal} />
        <Stack.Screen name="SearchModal" component={SearchModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigation;
