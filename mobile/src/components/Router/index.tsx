import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import NewDeviceScreen from '../../screens/New';
import theme from '../../styles/theme';

export type RouterParams = {
  Home: undefined;
  NewDevice: undefined;
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
      <Stack.Screen
        name="NewDevice"
        component={NewDeviceScreen}
        options={{
          headerTitle: 'Novo Dispositivo',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
