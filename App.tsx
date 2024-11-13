import React from 'react';
import {StyleSheet, View} from 'react-native';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Navigation} from './src/components/navigation/Navigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import ClosedRestaurant from './src/components/ClosedRestaurantModal/ClosedRestaurant.tsx';
import * as Sentry from '@sentry/react-native';
import ErrorScreen from './src/components/ErrorScreen/ErrorScreen.tsx';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import {agent} from './APIClient.tsx';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 10,
    },
  },
});
Sentry.init({});
function App() {
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });
  return (
    <Sentry.ErrorBoundary
      onError={(error, componentStack) =>
        agent.axiosClient.post('/log', {
          error: error.message,
          stack: componentStack,
        })
      }
      fallback={({resetError}) => <ErrorScreen resetError={resetError} />}>
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
