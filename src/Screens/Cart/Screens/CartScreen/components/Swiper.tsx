import React, {useRef, useState} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';

import Truck from '../../../../../assets/Icons/Truck.svg';
import Package from '../../../../../assets/Icons/Package.svg';

const Swiper = () => {
  const [isActive, setIsActive] = useState(false);
  const tabPosition = useRef(new Animated.Value(0)).current;

  const handlePress = (active: boolean) => {
    setIsActive(active);
    Animated.timing(tabPosition, {
      toValue: active ? nw(187) :  5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  //bug withh start position

  return (
      <View style={styles.container}>
        <Animated.View style={[styles.tab, {transform: [{translateX: tabPosition}]}]}/>
        <Pressable onPress={() => handlePress(!isActive)} style={styles.textWrapper}>
          <Package width="15" height="15"  color={isActive ? 'white' : 'black'}/>
          <Text style={isActive ? styles.whiteText : styles.blackText}>Самовывоз</Text>
        </Pressable>
        <Pressable onPress={() => handlePress(!isActive)} style={styles.textWrapper}>
          <Truck width="15" height="15" color={isActive ? 'black' : 'white'}/>
          <Text style={isActive ? styles.blackText : styles.whiteText}>Доставка</Text>
        </Pressable>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: nw(365),
    height: nh(50),
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  tab: {
    position: 'absolute',
    top: nh(5),
    backgroundColor: '#FFE600',
    width: nw(170),
    height: nh(40),
    borderRadius: 10,
  },
  textWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: nw(170),
    justifyContent: 'center',
  },
  whiteText: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: nw(15),
  },
  blackText: {
    color: 'black',
    fontFamily: 'MontserratRegular',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: nw(15),
  },
});

export default Swiper;
