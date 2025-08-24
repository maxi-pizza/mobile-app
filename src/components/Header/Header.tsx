import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import {observer} from 'mobx-react-lite';
import {useNavigation} from '@react-navigation/native';

export const Header = observer(
  () => {
    const navigation = useNavigation();
    return (
      <Pressable onPress={() => {
        // @ts-ignore
        navigation.navigate('Home');
      }}>
        <View style={styles.container}>
          <View style={styles.block} >
            <Image  style={styles.logo} source={require('~/assets/Logo.png')}/>
          </View>
        </View>
      </Pressable>
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
    width: nw(61 / 1.5),
    height: nh(50 / 1.5),
  },
  block: {

    width: "100%",
    height: nh(18),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
