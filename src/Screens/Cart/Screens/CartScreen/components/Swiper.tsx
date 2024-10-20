import React, {useRef} from 'react';
import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';
import {SvgProps} from 'react-native-svg';

type shippingObj = {
  id: number;
  name: string;
  icon: React.FC<SvgProps>;
};

const Swiper = ({
  options,
  isActive,
  setIsActive,
}: {
  options: shippingObj[];
  isActive: number;
  setIsActive: (active: number) => void;
}) => {
  const tabPosition = useRef(new Animated.Value(5)).current;

  // todo: {id: , name: , icon: ,} make a new object in checkout
  const handlePress = (active: number) => {
    setIsActive(active);
    Animated.timing(tabPosition, {
      toValue: active ? nw(187) : 5,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.tab, {transform: [{translateX: tabPosition}]}]}
      />
      {options.map((item, index) => (
        <Pressable
          key={item.name}
          onPress={() => handlePress((isActive = index))}
          style={styles.textWrapper}>
          <item.icon
            width={nw(15)}
            height={nh(15)}
            color={isActive === index ? 'black' : 'white'}
          />
          <Text
            style={isActive === index ? styles.blackText : styles.whiteText}>
            {item.name}
          </Text>
        </Pressable>
      ))}
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
