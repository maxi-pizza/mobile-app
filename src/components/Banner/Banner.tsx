import React from 'react';
import {StyleSheet, View} from 'react-native';
import BGBanner from '../../assets/BGBanner.svg';
import {nh, nw} from '../../../normalize.helper.ts';

const Banner = () => {
  return (
      <View style={styles.wrapper}>
        <BGBanner style={styles.banner}/>
      </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
  },
  banner: {
    width: nw(365),
    height: nh(160),
  },
});

export default Banner;
