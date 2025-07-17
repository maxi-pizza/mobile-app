import React, {useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

import Eye from '~/assets/Icons/Eye.svg';

type PasswordInputProps = {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
};

const PasswordInput = ({
  placeholder,
  onChangeText,
  value,
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
});

export default PasswordInput;
