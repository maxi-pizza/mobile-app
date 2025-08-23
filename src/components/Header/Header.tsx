import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import {observer} from 'mobx-react-lite';

export const Header = observer(
  () => {
    return (
      <View style={styles.container}>
        <View style={styles.block} />
        <Image style={styles.logo} source={require('~/assets/Logo.png')}/>

      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(70),
    justifyContent: 'flex-end',
    width: '100%',
  },
  logo: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: -nw(36.5)}],
    width: nw(68 / 1.5),
     height: nw(50 / 1.5),
  },
  block: {
    width: nw(79),
    height: nh(18),
  },
});
