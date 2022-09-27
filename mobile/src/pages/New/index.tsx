import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import DeviceForm from '../../components/DeviceForm';
import { RouterParams } from '../../components/Router';
import createDevice from '../../lib/createDevice';
import { SubmitDeviceData } from '../../types/device';

type NewDeviceScreenProps = NativeStackScreenProps<RouterParams, 'NewDevice'>;

const NewDeviceScreen: React.FC<NewDeviceScreenProps> = ({ navigation }) => {
  const onSubmit = (data: SubmitDeviceData) => {
    createDevice(data)
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Erro ao cadastrar dispositivo', err);
        console.error(err);
      });
  };

  return <DeviceForm onSubmit={onSubmit} />;
};

export default NewDeviceScreen;
