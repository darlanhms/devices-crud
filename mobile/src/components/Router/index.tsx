import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/Home';
import NewDeviceScreen from '../../screens/New';
import UpdateDeviceScreen from '../../screens/Update';
import theme from '../../styles/theme';
import Device from '../../types/device';

export type RouterParams = {
  Home: undefined;
  NewDevice: undefined;
  UpdateDevice: {
    device: Device;
  };
};

export const Stack = createNativeStackNavigator<RouterParams>();

interface RouterProps {
  initialRouteName?: keyof RouterParams;
}

const Router: React.FC<RouterProps> = props => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: theme.colors.white,
      }}
      {...props}
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
      <Stack.Screen
        name="UpdateDevice"
        component={UpdateDeviceScreen}
        options={{
          headerTitle: 'Editar Dispositivo',
        }}
      />
    </Stack.Navigator>
  );
};

export default Router;
