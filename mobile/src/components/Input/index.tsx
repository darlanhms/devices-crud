import { TextInput, TextInputProps } from 'react-native';
import styles from './styles';

export interface InputProps extends TextInputProps {
  error?: boolean;
}

const Input: React.FC<InputProps> = ({ style, error, ...rest }) => {
  return <TextInput {...rest} style={[style, styles.input, error ? styles.inputError : {}]} />;
};

export default Input;
