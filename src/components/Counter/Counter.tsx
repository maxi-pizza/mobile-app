import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { nw} from '../../../normalize.helper.ts';

import Minus from '../../assets/Icons/Minus.svg';
import Plus from '../../assets/Icons/Plus.svg';



const Counter = () => {
  const [count, setCount] = useState(0);

  const onHandleAdd = () => {
    setCount(count + 1);
  };

  const onHandleMinus = () => {
    if(count < 1) {
      setCount(0);
    }else {
      setCount(count - 1);
    }
  };
  return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onHandleMinus} style={styles.buttonMinus}>
          <Minus color="white" width="16" height="16"/>
        </TouchableOpacity>
        <View style={styles.textWrapper}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        <TouchableOpacity onPress={onHandleAdd} style={styles.buttonPlus}>
          <Plus color="white" width="16" height="16"/>
        </TouchableOpacity>
      </View>
  );
};


const styles = StyleSheet.create({
  buttonMinus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPlus: {
    width: nw(35),
    height: nw(35),
    borderRadius: 20,
    backgroundColor: '#2A2A2A',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: nw(111),
    justifyContent: 'space-between',
  },
  countText: {
    fontWeight: '600',
    fontFamily: 'MontserratRegular',
    fontSize: 18,
    lineHeight: 22,
    color: 'white',
  },
  textWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Counter;
