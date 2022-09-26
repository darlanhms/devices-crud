import { TouchableHighlight, View, TouchableHighlightProps } from 'react-native';
import styles from './styles';

const ActionButton: React.FC<TouchableHighlightProps> = ({ children, ...rest }) => {
  return (
    <TouchableHighlight {...rest}>
      <View style={styles.content}>{children}</View>
    </TouchableHighlight>
  );
};

export default ActionButton;
