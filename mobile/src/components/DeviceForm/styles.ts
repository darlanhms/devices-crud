import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  formField: {
    marginBottom: 10,
  },
  picker: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.borderRadius.md,
  },
  button: {
    marginTop: 10,
  },
});

export default styles;
