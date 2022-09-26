import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  helperText: {
    fontSize: 13,
    marginTop: 3,
    marginLeft: 1,
  },
  helperTextError: {
    color: theme.colors.error,
  },
});

export default styles;
