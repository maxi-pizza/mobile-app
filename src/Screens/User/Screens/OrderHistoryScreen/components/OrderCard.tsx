import React, {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';

import Caret from '../../../../../assets/Icons/Caret.svg';
import ProductSrc from '../../.././../../assets/Product.png';

const OrderCard = ({status}: {status: boolean}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={styles.order}>
      <Pressable onPress={() => setIsOpen(!isOpen)} style={styles.cardHeader}>
        <View>
          <Text style={styles.greyText}>№ 21321</Text>
          <Text style={styles.whiteText}>2023-08-25</Text>
        </View>
        <Text style={status ? styles.yellowText : styles.redText}>
          {status ? 'Выполнен' : 'Отмена'}
        </Text>
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
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Способ оплаты</Text>
              <Text style={styles.whiteText}>Наличными</Text>
            </View>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Способ доставки</Text>
              <Text style={styles.whiteText}>Самовывоз</Text>
            </View>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Адрес доставки</Text>
              <View style={styles.textWrap}>
                <Text style={styles.whiteText}>Литвиненко-Вольгемут 1Г</Text>
              </View>
            </View>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.orderStatus}>
            <Text style={styles.whiteText}>Статус заказа</Text>
            <Text
              style={[
                status ? styles.yellowText : styles.redText,
                styles.font,
              ]}>
              {status ? 'Выполнен' : 'Отмена'}
            </Text>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.productCard}>
            <View style={styles.imageTextWrapper}>
              <Image style={styles.image} source={ProductSrc} />
              <View style={styles.textWrapper}>
                <Text style={styles.whiteText}>Ролл Калифорния с угрём</Text>
                <Text style={styles.whiteText}>220 г</Text>
              </View>
            </View>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Цена за шт</Text>
              <Text style={styles.smallPrice}>169 ₴</Text>
            </View>
            <View style={styles.orderInfoTextWrapper}>
              <Text style={styles.greyText}>Всего</Text>
              <Text style={styles.smallPrice}>169 ₴</Text>
            </View>
          </View>
          <View style={styles.horizontalBar} />
          <View style={styles.orderInfoTextWrapper}>
            <Text style={[styles.greyText, styles.font]}>Сумма заказа</Text>
            <Text style={styles.bigPrice}>338 ₴</Text>
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
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    lineHeight: 17,
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

export default OrderCard;
