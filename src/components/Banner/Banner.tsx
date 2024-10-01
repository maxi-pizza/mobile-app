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
    marginTop: nh(40),
  },
  banner: {
    width: nw(365),
    height: nh(160),
  },
});

export default Banner;
