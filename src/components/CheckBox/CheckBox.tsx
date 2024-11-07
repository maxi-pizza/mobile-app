import React, {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Check from '~/assets/Icons/Check.svg';

export const CheckBox = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <Pressable style={styles.container} onPress={() => setIsActive(!isActive)}>
      {isActive && <Check color="#FFE600" />}
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
