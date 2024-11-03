import React, {useState} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {nh, nw} from '../../../normalize.helper.ts';

const LanguageChange = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <Pressable
      onPress={() => setIsActive(!isActive)}
      style={styles.languageContainer}>
      <Text
        style={[
          styles.languageText,
          isActive ? styles.whiteText : styles.notSelectedText,
        ]}>
        UA
      </Text>
      <Text style={[styles.languageText, styles.whiteText]}> | </Text>
      <Text
        style={[
          styles.languageText,
          !isActive ? styles.whiteText : styles.notSelectedText,
        ]}>
        RU
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    flexDirection: 'row',
    width: nw(66),
    marginLeft: nw(13),
  },
  languageText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(15),
    lineHeight: 18,
  },
  notSelectedText: {
    color: '#5C5C5C',
  },
  whiteText: {
    color: 'white',
  },
});

export default LanguageChange;
