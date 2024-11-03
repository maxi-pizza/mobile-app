import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

const UserOption = ({
  svgIcon,
  title,
}: {
  svgIcon: React.ReactNode;
  title: string;
}) => {
  return (
    <View style={styles.settingWrapper}>
      <View style={styles.svgCircle}>{svgIcon}</View>
      <Text style={styles.screenName}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  svgCircle: {
    width: nw(42),
    height: nh(42),
    marginLeft: nw(13),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 21,
  },
  screenName: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(13),
    fontWeight: '400',
    lineHeight: 16,
    marginLeft: nw(15),
    color: 'white',
  },
  settingWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginTop: nh(15),
    alignItems: 'center',
    marginBottom: nh(15),
  },
});

export default UserOption;
