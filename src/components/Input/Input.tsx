import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {nh, nw} from '~/common/normalize.helper.ts';

const styles = StyleSheet.create({
  input: {
    height: nh(47),
    borderRadius: 10,
    backgroundColor: '#272727',
    color: 'white',
    paddingLeft: nw(10),
    fontSize: nh(14),
    fontFamily: 'MontserratRegular',
  },
  focused: {
    borderWidth: 1,
    borderColor: 'white',
  },
  disabled: {
    opacity: 0.4,
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
    zIndex: 10,
  },
  errorText: {
    fontFamily: 'MontserratRegular',
    fontSize: nh(12),
    color: 'white',
    fontWeight: '500',
  },
});

export const Input = ({
  placeholder,
  inputMode,
  onChangeText,
  editable = true,
  value,
  error,
}: {
  placeholder: string;
  inputMode: 'email' | 'text' | 'tel' | 'numeric';
  onChangeText: (text: string) => void;
  editable?: boolean;
  value: string;
  error?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <TextInput
        style={[
          styles.input,
          isFocused ? styles.focused : null,
          error && styles.errorFocus,
          editable ? null: styles.disabled
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor="#616161"
        inputMode={inputMode}
        onChangeText={onChangeText}
        value={value}
        editable={editable}

      />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};
