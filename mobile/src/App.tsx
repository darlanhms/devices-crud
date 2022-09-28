import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import Router from './components/Router';
import navigatorTheme from './styles/navigatorTheme';

const App: React.FC = () => {
  return (
    <NavigationContainer theme={navigatorTheme}>
      <StatusBar barStyle="light-content" />
      <Router />
    </NavigationContainer>
  );
};

export default App;
