import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, Alert, FlatList, Text, View, Dimensions } from 'react-native';
import ActionButton from '../../components/ActionButton';
import DeviceActionsModal from '../../components/DeviceActionsModal';
import DeviceCard from '../../components/DeviceCard';
import listDevices from '../../lib/listDevices';
import Device from '../../types/device';
import noop from '../../utils/noop';
import styles from './styles';

const Home: React.FC = () => {
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    listDevices()
      .then(newDevices => setDevices(newDevices))
      .catch(err => {
        Alert.alert('Erro inesperado', 'Houve um problema ao listar os dispositivos');
        console.error(err);
      });
  }, []);

  const selectedDevice = useMemo(() => {
    return devices.find(device => device.id === selected);
  }, []);

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
        <ActionButton style={styles.addButton}>
          <Text style={styles.buttonText}>+</Text>
        </ActionButton>
      </View>
    </SafeAreaView>
  );
};

export default Home;
