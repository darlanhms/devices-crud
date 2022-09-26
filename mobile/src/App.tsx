import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, Text } from 'react-native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <SafeAreaView>
        <StatusBar />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <Text>Teste</Text>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
