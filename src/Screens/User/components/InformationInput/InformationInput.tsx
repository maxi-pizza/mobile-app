import React, {useState} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {nh, nw} from '../../../../../normalize.helper.ts';

const InformationInput = ({
  placeholder,
  inputMode,
  onChangeText,
  value,
}: {
  placeholder: string;
  inputMode: 'email' | 'text' | 'tel' | 'numeric';
  onChangeText: (text: string) => void;
  value: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, isFocused ? styles.focused : null]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      placeholder={placeholder}
      placeholderTextColor="#616161"
      inputMode={inputMode}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#272727',
    color: 'white',
    paddingLeft: nw(10),
  },
  focused: {
    borderWidth: 1,
    borderColor: '#FFE600',
  },
});

export default InformationInput;
