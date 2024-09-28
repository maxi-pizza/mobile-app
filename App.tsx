import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Header from './src/components/Header/Header.tsx';
import { Navigation } from './src/components/navigation/Navigation';
import { NavigationProvider, useNavigationContext } from './src/context/NavigationContext.tsx';


function App(): JSX.Element {
  return (
        <GestureHandlerRootView>
            <NavigationProvider>
                <BottomSheetModalProvider>
                  <View style={styles.container}>
                      <NavigationContainerWrapper />
                  </View>
                </BottomSheetModalProvider>
            </NavigationProvider>
        </GestureHandlerRootView>
  );
}



const NavigationContainerWrapper = () => {
  const { setRouteName } = useNavigationContext();

  return (
      <NavigationContainer
          onStateChange={(state) => {
            const route = state?.routes[state.index];
            if (route) {
              setRouteName(route.name);
            }
          }}
      >
        <Header />
        <Navigation />
      </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    flex: 1,
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default App;
