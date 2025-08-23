import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Check from '~/assets/Icons/Check.svg';

type CheckBoxProps = {
  onChange: (value: boolean) => void;
  active: boolean;
};
export const CheckBox = ({onChange, active}: CheckBoxProps) => {
  return (
    <Pressable style={styles.container} onPress={() => onChange(!active)}>
      {active && <Check color="white" />}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: nh(30),
    width: nw(30),
    backgroundColor: '#272727',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
