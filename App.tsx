import React from 'react';
import { StyleSheet, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { Navigation } from './src/components/navigation/Navigation';



function App(): JSX.Element {
  return (
        <GestureHandlerRootView>
            <NavigationContainer>
                <BottomSheetModalProvider>
                  <View style={styles.container}>
                    <Navigation />
                  </View>
                </BottomSheetModalProvider>
            </NavigationContainer>
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
