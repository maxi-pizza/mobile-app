import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {nh, nw} from '../../../../../../normalize.helper.ts';

import Heart from '../../../../../assets/Icons/Heart.svg';
import Trash from '../../../../../assets/Icons/Trash.svg';

const SavedAddress = ({address}: {address: string}) => {
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.address}>{address}</Text>
      <Heart
        color="yellow"
        width="20"
        fill={isFavourite ? 'yellow' : 'transparent'}
        onPress={() => setIsFavourite(!isFavourite)}
        height="20"
        style={styles.heart}
      />
      <Trash color="red" width="20" height="20" style={styles.trash} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: nw(365),
    height: nh(47),
    backgroundColor: '#272727',
    marginBottom: nh(15),
    borderRadius: 10,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: nw(10),
  },
  address: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(14),
    fontWeight: '400',
    lineHeight: 17,
  },
  heart: {
    position: 'absolute',
    right: 0,
    marginRight: nw(40),
    marginTop: nh(13),
  },
  trash: {
    position: 'absolute',
    right: 0,
    marginRight: nw(10),
    marginTop: nh(13),
  },
});

export default SavedAddress;
