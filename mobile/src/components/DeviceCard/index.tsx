import { View, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import Device, { DeviceType } from '../../types/device';
import styles from './styles';

interface DeviceCardProps extends TouchableOpacityProps {
  device: Device;
}

const getTypeLabel = (type: DeviceType) => {
  switch (type) {
    case 'camera':
      return 'Câmera';
    case 'remoteControl':
      return 'Controle remoto';
    case 'sensor':
      return 'Sensor';
    default:
      throw new Error(`Dispositivo com tipo inesperado ${type}`);
  }
};

const DeviceCard: React.FC<DeviceCardProps> = ({ device, style, ...rest }) => {
  return (
    <TouchableOpacity {...rest} style={[style, styles.card]}>
      <Text style={styles.name}>{device.name}</Text>
      <View style={styles.propContainer}>
        <Text style={styles.label}>Serial: </Text>
        <Text style={styles.text}>{device.serial}</Text>
      </View>
      <View style={styles.propContainer}>
        <Text style={styles.label}>Mac address: </Text>
        <Text style={styles.text}>{device.macAddress}</Text>
      </View>
      <View style={styles.propContainer}>
        <Text style={styles.label}>Tipo: </Text>
        <Text style={styles.text}>{getTypeLabel(device.type)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default DeviceCard;
