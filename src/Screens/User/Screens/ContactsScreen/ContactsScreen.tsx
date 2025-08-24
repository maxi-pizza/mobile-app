import React from 'react';
import {
  Linking,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Phone from '~/assets/Icons/Phone.svg';
import Instagram from '~/assets/Icons/Instagram.svg';
import {Header, BackButton} from '~/components';
import {useQuery} from '@tanstack/react-query';

import {observer} from 'mobx-react-lite';
import {contactsQuery} from '~/common/queries/contactsQuery';

const ContactsScreen = observer(({navigation}: {navigation: any}) => {

  const {data: contacts} = useQuery(contactsQuery);

  const phonesArray = contacts?.phones || [];
  const openLinkHandler = async (appUrl: string, webUrl: string) => {
    try {
      const supported = appUrl !== '' && (await Linking.canOpenURL(appUrl));
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (e) {}
  };
  return (
    <View style={styles.container}>
      <Header />
      <BackButton navigation={navigation} />
      <View style={styles.wrapper}>
        <Text style={styles.header}>Контакти</Text>
        <View style={styles.btnWrapper}>
          {contacts?.instagram_display_text && (
            <TouchableOpacity
              onPress={() =>
                openLinkHandler(contacts.instagram_app, contacts.instagram_web)
              }
              style={styles.btn}>
              <Instagram width="17" height="17" color="white" />
              <Text style={styles.btnText}>
                {contacts.instagram_display_text}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View
          style={[
            phonesArray?.length ?? 0 > 1
              ? styles.phonesWrapper
              : styles.phoneWrapper,
          ]}>
          {phonesArray?.map((phone, index) => (
            <Pressable
              onPress={() => Linking.openURL(`tel:${phone}`)}
              key={index}
              style={styles.phoneSvgWrapper}>
              <Text>
                <Phone width="15" color="#727272" />
              </Text>
              <Text style={styles.phoneText}>{phone}</Text>
            </Pressable>
          ))}
        </View>
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
    backgroundColor: 'rgb(225, 43, 23)',
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
    color: 'white',
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
