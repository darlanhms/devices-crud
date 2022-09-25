import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from '../../components/Container';
import DeviceForm from '../../components/DeviceForm';
import PageTitle from '../../components/PageTitle';
import findDeviceById from '../../lib/findDeviceById';
import updateDevice from '../../lib/updateDevice';
import Device, { SubmitDeviceData } from '../../types/device';

import styles from './styles.module.css';

const UpdateDevicePage: React.FC = () => {
  const { deviceId } = useParams();
  const [device, setDevice] = useState<Device>();
  const navigate = useNavigate();

  useEffect(() => {
    if (deviceId) {
      findDeviceById(deviceId)
        .then(foundDevice => setDevice(foundDevice))
        .catch(error => {
          if (error instanceof Error) {
            alert(`Erro ao encontrar dispositivo: ${error.message}`);
          } else {
            console.error(error);
          }
        });
    }
  }, [deviceId]);

  const onSubmit = async (data: SubmitDeviceData) => {
    if (!deviceId) {
      alert('Dispositivo para atualizar não encontrado');
      return;
    }

    try {
      await updateDevice({ ...data, id: deviceId });

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Erro ao editar dispositivo: ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container className={styles.container}>
      <PageTitle>Editar Dispositivo</PageTitle>
      <DeviceForm onSubmit={onSubmit} initialData={device} />
    </Container>
  );
};

export default UpdateDevicePage;
