import { TouchableNativeFeedback, View, TouchableNativeFeedbackProps } from 'react-native';
import styles from './styles';

const ActionButton: React.FC<TouchableNativeFeedbackProps> = ({ children, ...rest }) => {
  return (
    <TouchableNativeFeedback {...rest}>
      <View style={styles.content}>{children}</View>
    </TouchableNativeFeedback>
  );
};

export default ActionButton;
