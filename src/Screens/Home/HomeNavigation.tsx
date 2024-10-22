import HomeScreen from './Screens/HomeScreen/HomeScreen.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import ProductModal from './Screens/Modals/ProductModal.tsx';
import SearchModal from './Screens/Modals/SearchModal.tsx';

type ScreenProps = {
  Home: undefined;
  ProductModal: undefined;
  SearchModal: undefined;
};
const HomeNavigation = () => {
  const Stack = createStackNavigator<ScreenProps>();
  const stackOptions = {
    headerShown: false,
    animationEnabled: false,
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group screenOptions={stackOptions}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Group>
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
