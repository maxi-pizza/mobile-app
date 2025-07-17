import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import ProfileScreen from '../ProfileScreen/ProfileScreen.tsx';

import UserCircle from '~/assets/Icons/UserCircle.svg';
import Caret from '~/assets/Icons/Caret.svg';
import ClockCounter from '~/assets/Icons/ClockCounterClockwise.svg';
import Truck from '~/assets/Icons/Truck.svg';
import Phone from '~/assets/Icons/Phone.svg';
import CreditCard from '~/assets/Icons/CreditCard.svg';
import Coins from '~/assets/Icons/Coins.svg';
import {Header, UserOption} from '~/components';
import {observer} from 'mobx-react-lite';

const UserScreen = observer(({navigation}: {navigation: any}) => {
   const [logged, setLogged] = useState(false);
   const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Header />
       {logged ? (
        <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
          <View style={styles.horizontalLine} />
          <View style={styles.profileContainer}>
            <View style={styles.profileTextUserWrapper}>
              <View style={styles.userCircle}>
                <UserCircle color="#727272" />
              </View>
              <View style={styles.profileTextWrapper}>
                <Text style={styles.profileText}>Ваш профіль</Text>
                <Text style={styles.gmail}>mymail@gmail.com</Text>
              </View>
            </View>
            <Caret
              style={styles.caret}
              width="15"
              height="15"
              color="#FFE600"
            />
          </View>
        </TouchableOpacity>
      ) : (
        <View style={styles.withoutAccount}>
          <View style={styles.withoutAccountWrapper}>
            <View style={styles.userCircle}>
              <UserCircle color="#727272" />
            </View>
            <Text style={styles.signInText}>Увійдіть в акаунт</Text>
            <Text style={styles.descriptionText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt.
            </Text>
            <View style={styles.btnWrapper}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUp')}
                style={styles.signUpBtn}>
                <Text style={styles.signUpBtnText}>Реєстрація</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('SignIn')}
                style={styles.signInBtn}>
                <Text style={styles.signInBtnText}>Увійти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <ProfileScreen visible={isVisible} setIsVisible={setIsVisible} />
      <View style={styles.horizontalLine} />
      <TouchableOpacity onPress={() => navigation.navigate('OrderHistory')}>
        <UserOption
          title="Історія замовлень"
          svgIcon={<ClockCounter color="#727272" />}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('SavedAddresses')}>
        <UserOption
          title="Збережені адреси"
          svgIcon={<Truck color="#727272" />}
        />
      </TouchableOpacity> 

      <View style={styles.horizontalLine} />

      <TouchableOpacity onPress={() => navigation.navigate('Contacts')}>
        <UserOption title="Контакти" svgIcon={<Phone color="#727272" />} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('DeliveryAndPayment')}>
        <UserOption
          title="Доставка і оплата"
          svgIcon={<CreditCard color="#727272" />}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('RefundRules')}>
        <UserOption
          title="Правила повернення коштів"
          svgIcon={<Coins color="#727272" />}
        />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#171717',
  },
  withoutAccount: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  withoutAccountWrapper: {
    display: 'flex',
    height: nh(217),
    justifyContent: 'center',
    alignItems: 'center',
    width: nw(365),
  },
  profileContainer: {
    width: '100%',
    height: nh(102),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: nw(13),
  },
  userCircle: {
    backgroundColor: '#1C1C1C',
    width: nw(72),
    height: nh(72),
    borderRadius: 36,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gmail: {
    fontFamily: 'MontserratRegular',
    fontWeight: '400',
    fontSize: nh(13),
    lineHeight: 16,
    color: '#757575',
  },
  profileText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(15),
    fontWeight: '400',
    lineHeight: 18,
    color: 'white',
  },
  profileTextUserWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileTextWrapper: {
    marginLeft: nw(15),
  },
  caret: {
    transform: [{rotate: '-90deg'}],
    marginRight: nw(25),
  },
  horizontalLine: {
    height: nh(1),
    width: '100%',
    backgroundColor: '#202020',
  },
  signInText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(15),
    lineHeight: 18,
    fontWeight: '500',
    color: 'white',
    marginTop: nh(15),
  },
  descriptionText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    lineHeight: 14,
    fontWeight: '400',
    color: 'white',
    textAlign: 'center',
    marginTop: nh(5),
  },
  signInBtn: {
    width: nw(175),
    height: nh(37),
    borderRadius: 10,
    color: 'black',
    backgroundColor: '#FFE600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtn: {
    width: nw(175),
    height: nh(37),
    borderRadius: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFE600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtnText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '500',
    lineHeight: 17,
    color: 'white',
  },
  signInBtnText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '500',
    lineHeight: 17,
    color: 'black',
  },
  btnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: nh(15),
    marginBottom: nh(15),
  },
});

export default UserScreen;
