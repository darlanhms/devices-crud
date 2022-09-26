import { DefaultTheme, Theme } from '@react-navigation/native';
import theme from './theme';

const navigatorTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    background: theme.colors.white,
  },
};

export default navigatorTheme;
