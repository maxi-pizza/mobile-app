import React from 'react';
import { StyleSheet, View } from 'react-native';
import './gesture-handler';
import { Navigation } from './src/components/navigation/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import Header from './src/components/Header/Header.tsx';



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#141414',
    height: '100%',
  },
});

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Header/>
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </View>
  );

}

export default App;
