import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { Navigation } from './src/components/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});



function App(): JSX.Element {
  return (
        <GestureHandlerRootView>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer>
                <BottomSheetModalProvider>
                  <View style={styles.container}>
                    <Navigation />
                  </View>
                </BottomSheetModalProvider>
            </NavigationContainer>
          </QueryClientProvider>
        </GestureHandlerRootView>
  );
}


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
