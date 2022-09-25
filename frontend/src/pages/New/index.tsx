import { useNavigate } from 'react-router-dom';

import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import createDevice from '../../lib/createDevice';
import DeviceForm from '../../components/DeviceForm';
import { SubmitDeviceData } from '../../types/device';

import styles from './styles.module.css';

const NewDevicePage: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: SubmitDeviceData) => {
    try {
      await createDevice(data);

      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Erro ao cadastrar dispositivo: ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  return (
    <Container className={styles.container}>
      <PageTitle>Novo Dispositivo</PageTitle>
      <DeviceForm onSubmit={onSubmit} />
    </Container>
  );
};

export default NewDevicePage;
