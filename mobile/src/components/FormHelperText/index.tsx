import { Text, TextProps } from 'react-native';
import styles from './styles';

export interface FormHelperTextProps extends TextProps {
  error?: boolean;
}

const FormHelperText: React.FC<FormHelperTextProps> = ({ error, children, style, ...rest }) => {
  return (
    <Text {...rest} style={[style, styles.helperText, error ? styles.helperTextError : {}]}>
      {children}
    </Text>
  );
};

export default FormHelperText;
