import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  buttonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height - 60,
    width: Dimensions.get('window').width,
  },
  buttonText: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default styles;
