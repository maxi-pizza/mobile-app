import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Header, BackButton} from '~/components';
import {nh, nw} from '~/common/normalize.helper.ts';
import {observer} from 'mobx-react-lite';
import {useQuery} from '@tanstack/react-query';
import {contactsQuery} from '~/common/queries/contactsQuery.ts';

const DeliveryAndPayment = observer(({navigation}: {navigation: any}) => {

  const {data: contacts} = useQuery(contactsQuery);
  return (
    <View style={styles.container}>
      <Header />
      <BackButton navigation={navigation} />
      <View style={styles.map}>
        <Text style={styles.title}>Доставка і оплата</Text>
        <View style={{width: nw(365), height: nh(365)}}>
          <Text  style={styles.description}>
            {contacts?.delivery_and_payment_info}
          </Text>
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
  map: {
    display: 'flex',
    alignItems: 'center',
    marginTop: nh(30),
  },
  title: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(20),
    fontWeight: '600',
    width: nw(365),
    marginBottom: nh(15),
  },
  description: {
    color: 'white',
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '400',
    width: nw(365),
    marginBottom: nh(15),
  },

});

export default DeliveryAndPayment;
