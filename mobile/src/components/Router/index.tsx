import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../pages/Home';
import theme from '../../styles/theme';

export type RouterParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RouterParams>();

const Router: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: 'Dispositivos Eletrônicos',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
