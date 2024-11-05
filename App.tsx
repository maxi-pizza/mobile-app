import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Navigation} from './src/components/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import ClosedRestaurant from './src/components/ClosedRestaurantModal/ClosedRestaurant.tsx';
import * as Sentry from '@sentry/react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});

function App(): JSX.Element {
  // This is the default configuration
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false, // Reanimated runs in strict mode by default
  });

  return (
    <Sentry.ErrorBoundary showDialog={true} fallback={<Text>error</Text>}>
      <GestureHandlerRootView>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <View style={styles.container}>
                <Navigation />
                <ClosedRestaurant />
              </View>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </QueryClientProvider>
      </GestureHandlerRootView>
    </Sentry.ErrorBoundary>
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

export default Sentry.wrap(App);
