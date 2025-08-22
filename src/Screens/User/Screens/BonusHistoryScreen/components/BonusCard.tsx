import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Caret from '~/assets/Icons/Caret.svg';
import ProductSrc from '~/assets/Product.png';
import {IBonusHistory} from '~/api';
type BonusCardProps = {
  data: IBonusHistory;
};
const formatTime = (time: string) => {
  const d = new Date(time).toLocaleString('en-GB');
  return d;
};
const BonusCard = ({data}: BonusCardProps) => {
  const {
    id,
    order_id,
    user_id,
    use_bonus_amount,
    receive_bonus_amount,
    created_at,
    updated_at,
  } = data;
  const [isOpen, setIsOpen] = useState(false);
  const total = receive_bonus_amount - use_bonus_amount;
  return (
    <View style={styles.order}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.cardHeader}>
        <View>
          {total >= 0 ? (
            <Text style={[total > 0 ? styles.greenText : styles.greenText]}>
              +{total}
            </Text>
          ) : (
            <Text style={[total > 0 ? styles.greenText : styles.redText]}>
              {total}
            </Text>
          )}

          <Text style={styles.whiteText}>{formatTime(updated_at)}</Text>
        </View>
        <Caret
          width="21"
          height="21"
          color="#727272"
          style={isOpen && styles.caretOpened}
        />
      </Pressable>
      {isOpen && (
        <View style={styles.orderContent}>
          <View style={styles.horizontalBar} />
          <View style={styles.orderInfo}>
            <Text style={[styles.greyText, {marginBottom: nh(10)}]}>Замовлення #{order_id}</Text>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Отримано бонусів</Text>
              <Text style={styles.whiteText}>{receive_bonus_amount}</Text>
            </View>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Використано бонусів</Text>
              <Text style={styles.whiteText}>{use_bonus_amount}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    width: nw(365),
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    marginBottom: nh(15),
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: nh(61),
    width: nw(335),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  greenText: {
    color: 'green',
    fontSize: nh(28),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 36,
  },
  greyText: {
    color: '#616161',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 17,
  },
  whiteText: {
    color: 'white',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 17,
  },
  yellowText: {
    color: '#FFE600',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 17,
  },
  caretOpened: {
    transform: [{rotate: '180deg'}],
  },
  redText: {
    color: '#CD3838',
    fontSize: nh(28),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 36,
  },
  horizontalBar: {
    height: 1,
    backgroundColor: '#2D2D2D',
    marginBottom: nh(12),
    marginTop: nh(12),
    width: nw(335),
  },
  orderContent: {
    width: nw(365),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#1C1C1C',
    display: 'flex',
    alignItems: 'center',
  },
  orderInfo: {
    width: nw(335),
  },
  orderInfoTextWrapper: {
    width: nw(335),
    marginBottom: nh(10),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrap: {
    width: nw(150),
    display: 'flex',
    alignItems: 'flex-end',
  },
  orderStatus: {
    display: 'flex',
    alignItems: 'center',
  },
  productCard: {
    width: nw(335),
  },
  imageTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: nh(10),
  },
  image: {
    height: nh(52),
    maxWidth: nw(80),
  },
  textWrapper: {
    marginLeft: nw(15),
    display: 'flex',
    justifyContent: 'space-between',
  },
  smallPrice: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '700',
    lineHeight: 17,
    color: 'white',
  },
  bigPrice: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(16),
    fontWeight: '700',
    lineHeight: 19,
    color: 'white',
  },
  font: {
    fontSize: nh(16),
  },
});

export default BonusCard;
