import { StyleSheet, Dimensions } from 'react-native';
import theme from '../../styles/theme';

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: '#0000007a',
    height: Dimensions.get('window').height,
  },
  modalBody: {
    width: Dimensions.get('window').width,
    backgroundColor: theme.colors.white,
    paddingVertical: 15,
    paddingHorizontal: 10,
    bottom: 0,
    position: 'absolute',
  },
  actionButtonContainer: {
    marginBottom: 12,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
  },
});

export default styles;
