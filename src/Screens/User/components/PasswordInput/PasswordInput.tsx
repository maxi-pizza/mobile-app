import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Eye from '~/assets/Icons/Eye.svg';

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
        style={[styles.input, isFocused ? styles.focused : null]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#616161"
        secureTextEntry={isSecure}
        inputMode="text"
        onChangeText={onChangeText}
        value={value}
      />
      <Eye onPress={() => setIsSecure(!isSecure)} style={styles.hideBtn} />
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
  },
  focused: {
    borderWidth: 1,
    borderColor: '#FFE600',
  },
  hideBtn: {
    position: 'absolute',
    right: 0,
    marginTop: nh(13),
    marginRight: nw(10),
  },
  errorFocus: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2,
    backgroundColor: 'rgb(205, 56, 56)',
    position: 'absolute',
    right: 0,
    top: 45,
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    color: 'white',
    fontWeight: '500',
  },
});

export default PasswordInput;
