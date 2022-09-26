import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../pages/Home';

export type RouterParams = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RouterParams>();

const Router: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default Router;
