import { Text, TextProps } from 'react-native';
import styles from './styles';

export type FormLabelProps = TextProps;

const FormLabel: React.FC<FormLabelProps> = ({ style, children, ...rest }) => {
  return (
    <Text {...rest} style={[styles.label, style]}>
      {children}
    </Text>
  );
};

export default FormLabel;
