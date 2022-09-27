import React, { useState, useEffect, useMemo } from 'react';
import { SafeAreaView, Alert, FlatList, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ActionButton from '../../components/ActionButton';
import DeviceActionsModal from '../../components/DeviceActionsModal';
import DeviceCard from '../../components/DeviceCard';
import listDevices from '../../lib/listDevices';
import Device from '../../types/device';
import styles from './styles';
import { RouterParams } from '../../components/Router';
import deleteDevice from '../../lib/deleteDevice';

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
  }, [selected]);

  const handleNewDevice = () => {
    navigation.navigate('NewDevice');
  };

  const handleUpdateDevice = () => {
    if (!selectedDevice) {
      return;
    }

    navigation.navigate('UpdateDevice', { device: selectedDevice });
  };

  const handleDeleteDevice = () => {
    if (!selectedDevice) {
      return;
    }

    Alert.alert('Confirmar exclusão', `Tem certeza que deseja excluir o dispositivo ${selectedDevice.name}`, [
      {
        style: 'cancel',
        text: 'Cancelar',
      },
      {
        onPress() {
          handleConfirmDeleteDevice();
        },
        text: 'Confirmar',
      },
    ]);
  };

  const handleConfirmDeleteDevice = () => {
    if (!selectedDevice) {
      return;
    }

    deleteDevice(selectedDevice.id)
      .then(() => {
        setSelected(undefined);
        setDevices(devices.filter(device => device.id !== selectedDevice.id));
      })
      .catch(err => {
        Alert.alert('Erro ao excluir dispositivo', err);
        console.error(err);
      });
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
        onDelete={handleDeleteDevice}
        onEdit={handleUpdateDevice}
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
