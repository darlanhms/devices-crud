import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

export interface InputProps extends TextInputProps {
  error?: boolean;
}

const Input = React.forwardRef<TextInput, InputProps>(({ style, error, ...rest }, ref) => {
  return <TextInput ref={ref} {...rest} style={[style, styles.input, error ? styles.inputError : {}]} />;
});

export default Input;
