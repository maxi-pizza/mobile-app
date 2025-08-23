import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Eye from '~/assets/Icons/Eye.svg';
import CrossedEye from '~/assets/Icons/CrossedEye.svg';

type PasswordInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  error?: string;
};

const PasswordInput = ({
  placeholder,
  onChangeText,
  value,
  error,
}: PasswordInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  return (
    <View>
      <TextInput
        style={[styles.input, isFocused ? styles.focused : null,     error && styles.errorFocus]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#616161"
        secureTextEntry={isSecure}
        inputMode="text"
        onChangeText={onChangeText}
        value={value}
      />
      <View style={styles.hideBtn}>
        {isSecure ? (
          <Eye height="100%"
               preserveAspectRatio="xMinYMin slice"
               width="100%"  onPress={() => setIsSecure(false)} />
        ):  <CrossedEye height="100%"
          preserveAspectRatio="xMinYMin slice"
          width="100%"  onPress={() => setIsSecure(true)}  />}
      </View>


      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: nw(365),
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#272727',
    color: 'white',
    paddingLeft: nw(10),
    position: 'relative',
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
  },
  focused: {
    borderWidth: 1,
  },

  hideBtn: {
    position: 'absolute',
    right: 0,
    width: nw(20),
    height: nh(21),
    marginTop: nh(13),
    marginRight: nw(10),
  },
  errorFocus: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorContainer: {
    paddingHorizontal: nw(5),
    paddingVertical: nh(2),
    backgroundColor: 'rgb(205, 56, 56)',
    position: 'absolute',
    right: 0,
    top: nh(45),
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    color: 'white',
    fontWeight: '500',
  },
});

export default PasswordInput;
