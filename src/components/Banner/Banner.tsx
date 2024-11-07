import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';
import {useQuery} from '@tanstack/react-query';
import Animated, {
  scrollTo,
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {bannerQuery} from './banner.query.ts';

export const Banner = () => {
  const flatRef = useAnimatedRef<Animated.FlatList<any>>();
  const [isAuto, setIsAuto] = useState(true);
  const interval = useRef<NodeJS.Timeout>();
  const offset = useSharedValue(0);
  const width = nw(365);

  const {data: bannerRes, isLoading: isBannerLoading} = useQuery(bannerQuery);
  const banners = (bannerRes?.data || []).map(item => ({
    id: item.id,
    image: item.image_small,
    product_id: item.product,
  }));

  useEffect(() => {
    if (isAuto) {
      interval.current = setInterval(() => {
        const last = offset.value + width;
        offset.value = last >= width * banners.length ? 0 : last;
      }, 5000);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [isAuto, width, banners.length]);

  useDerivedValue(() => {
    scrollTo(flatRef, offset.value, 0, true);
  });

  return (
    <View style={styles.wrapper}>
      <Animated.FlatList
        ref={flatRef}
        data={banners}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Image style={styles.banner} source={{uri: item.image.path}} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        onScrollBeginDrag={() => {
          setIsAuto(false);
        }}
        onScrollEndDrag={() => {
          setIsAuto(true);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: nh(40),
    width: nw(365),
    height: nh(133),
  },
  banner: {
    width: nw(365),
    height: nh(133),
    borderRadius: 10,
  },
});
