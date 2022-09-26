import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: 7,
    paddingTop: 7,
    paddingRight: 10,
    paddingLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 15,
  },
  propContainer: {
    flexDirection: 'row',
  },
});

export default styles;
