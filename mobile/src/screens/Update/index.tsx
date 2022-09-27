import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Alert } from 'react-native';
import DeviceForm from '../../components/DeviceForm';
import { RouterParams } from '../../components/Router';
import updateDevice from '../../lib/updateDevice';
import { SubmitDeviceData } from '../../types/device';

type UpdateDeviceScreenProps = NativeStackScreenProps<RouterParams, 'UpdateDevice'>;

const UpdateDeviceScreen: React.FC<UpdateDeviceScreenProps> = ({ navigation, route }) => {
  const { device } = route.params;

  const onSubmit = (data: SubmitDeviceData) => {
    updateDevice({ ...data, id: device.id })
      .then(() => {
        navigation.goBack();
      })
      .catch(err => {
        Alert.alert('Erro ao editar dispositivo', err);
        console.error(err);
      });
  };

  return <DeviceForm onSubmit={onSubmit} initialData={device} />;
};

export default UpdateDeviceScreen;
