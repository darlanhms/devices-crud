import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, Alert, FlatList, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActionButton from '../../components/ActionButton';
import DeviceActionsModal from '../../components/DeviceActionsModal';
import DeviceCard from '../../components/DeviceCard';
import listDevices from '../../lib/listDevices';
import Device from '../../types/device';
import noop from '../../utils/noop';
import styles from './styles';
import { RouterParams } from '../../components/Router';

type HomeProps = NativeStackScreenProps<RouterParams, 'Home'>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      listDevices()
        .then(newDevices => setDevices(newDevices))
        .catch(err => {
          Alert.alert('Erro inesperado', 'Houve um problema ao listar os dispositivos');
          console.error(err);
        });
    });

    return unsubscribe;
  }, [navigation]);

  const selectedDevice = useMemo(() => {
    return devices.find(device => device.id === selected);
  }, []);

  const handleNewDevice = () => {
    navigation.navigate('NewDevice');
  };

  return (
    <SafeAreaView>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DeviceCard device={item} onPress={() => setSelected(item.id)} />}
      />
      <DeviceActionsModal
        open={!!selected}
        onClose={() => setSelected(undefined)}
        onDelete={noop}
        onEdit={noop}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.addButton}>
          <ActionButton onPress={handleNewDevice}>
            <Text style={styles.buttonText}>+</Text>
          </ActionButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
