import HomeScreen from './Screens/HomeScreen/HomeScreen.tsx';
import {createStackNavigator} from '@react-navigation/stack';
import ProductModal from './Screens/ProductModal/ProductModal.tsx';

type ScreenProps = {
  Home: undefined;
  ProductModal: undefined;
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
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigation;
