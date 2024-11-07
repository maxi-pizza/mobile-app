import React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

import Phone from '../../../../assets/Icons/Phone.svg';
import Instagram from '../../../../assets/Icons/Instagram.svg';
import Telegram from '../../../../assets/Icons/Telegram.svg';
import {Header, BackButton} from '../../../../components';
import {useQuery} from '@tanstack/react-query';

import store from '../../../../stores/store.ts';
import {observer} from 'mobx-react-lite';
import {cityQuery} from '../../../../components/Header/city.query.ts';

const ContactsScreen = observer(({navigation}: {navigation: any}) => {
  const {data: cityRes} = useQuery(cityQuery);
  const cities = (cityRes || []).map(city => city);
  const city = cities.filter(c => c.slug === store.city);
  const phonesArray = city.map(c => c.phones.split(','));
  const openLinkHandler = async (appUrl: string, webUrl: string) => {
    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={styles.container}>
      <Header />
      <BackButton navigation={navigation} />
      <View style={styles.wrapper}>
        <Text style={styles.header}>Контакты</Text>
        <View style={styles.btnWrapper}>
          <TouchableOpacity
            onPress={() =>
              openLinkHandler(
                'instagram://user?username=emoji_sushi',
                'https://www.instagram.com/emoji_sushi',
              )
            }
            style={styles.btn}>
            <Instagram width="17" height="17" color="black" />
            <Text style={styles.btnText}> Наш инстаграм | @emoji_sushi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              openLinkHandler(
                'tg://resolve?domain=Emojisushibot',
                'https://t.me/Emojisushibot',
              )
            }
            style={styles.btn}>
            <Telegram width="17" height="17" color="black" />
            <Text style={styles.btnText}> Наш телеграм | @Emojisushibot</Text>
          </TouchableOpacity>
        </View>

        {phonesArray.map((phones, index) => (
          <View
            key={index}
            style={[
              phones.length > 1 ? styles.phonesWrapper : styles.phoneWrapper,
            ]}>
            {phones.map(phone => (
              <Pressable
                onPress={() => Linking.openURL(`tel:${phone}`)}
                key={phone}
                style={styles.phoneSvgWrapper}>
                <Text>
                  <Phone width="15" color="#727272" />
                </Text>
                <Text style={styles.phoneText}>{phone}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#141414',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    fontFamily: 'MontserratRegular',
    fontWeight: '600',
    fontSize: nh(20),
    lineHeight: 24,
    color: 'white',
    marginTop: nh(30),
    width: nw(365),
  },
  btnWrapper: {
    display: 'flex',
    marginTop: nh(30),
    alignItems: 'center',
  },
  btn: {
    width: nw(365),
    height: nh(42),
    borderRadius: 10,
    backgroundColor: '#FFE600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: nh(15),
  },
  btnText: {
    fontFamily: 'MontserratRegular',
    fontWeight: '500',
    fontSize: nh(14),
    lineHeight: 17,
    color: 'black',
  },
  phonesWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: nh(15),
    width: nw(365),
  },
  phoneWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: nh(15),
    width: nw(365),
  },
  phoneText: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
  },
  phoneSvgWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ContactsScreen;
