import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Header from '../../../../components/Header/Header.tsx';

const DeliveryAndPayment = ({ route}: { route: any}) => {
  return (
      <View style={styles.container}>
        <Header route={route}/>
        <View>
          {/*<MapView*/}
          {/*    provider={PROVIDER_GOOGLE} // remove if not using Google Maps*/}
          {/*    style={styles.map}*/}
          {/*    region={{*/}
          {/*      latitude: 37.78825,*/}
          {/*      longitude: -122.4324,*/}
          {/*      latitudeDelta: 0.015,*/}
          {/*      longitudeDelta: 0.0121,*/}
          {/*    }}/>*/}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default DeliveryAndPayment;
