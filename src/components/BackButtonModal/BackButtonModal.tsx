import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {nw} from '../../../normalize.helper.ts';

import Caret from '../../assets/Icons/Caret.svg';

const BackButtonModal = ({setIsVisible, visible}: {setIsVisible: (a: boolean) => void; visible: boolean}) => {
  return (
      <Pressable style={styles.hideBtn} onPress={() => setIsVisible(!visible)}><Caret style={styles.caret} width="21" height="21" color="black"/></Pressable>
  );
};

const styles = StyleSheet.create({
  caret: {
    transform: [{rotate: '90deg'}],
  },
  hideBtn: {
    position: 'absolute',
    marginTop: nw(15),
    marginLeft: nw(13),
    width: nw(31),
    height: nw(31),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE600',
    borderRadius: 5,
  },
});

export default BackButtonModal;
