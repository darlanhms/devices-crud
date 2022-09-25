import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'classnames';
import Button from '../../components/Button';
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import { VStack } from '../../components/Stack';
import Table from '../../components/Table';
import listDevices from '../../lib/listDevices';
import Device, { DeviceType } from '../../types/device';
import styles from './styles.module.css';

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

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Array<Device>>([]);
  const [selected, setSelected] = useState<string>();

  useEffect(() => {
    listDevices()
      .then(newDevices => setDevices(newDevices))
      .catch(error => {
        if (error instanceof Error) {
          alert(`Erro ao listar dispositivos: ${error.message}`);
        } else {
          console.error(error);
        }
      });
  }, []);

  const handleSelect = useCallback((id: string) => {
    setSelected(oldSelected => {
      if (id === oldSelected) {
        return undefined;
      }

      return id;
    });
  }, []);

  return (
    <Container className={styles.container}>
      <VStack spacing={2}>
        <PageTitle>Dispositivos eletrônicos</PageTitle>
        <div className={styles.buttonsContainer}>
          <div className={styles.actionButtons}>
            <Button disabled={!selected} onClick={() => navigate(`/${selected}`)}>
              Editar
            </Button>
            <Button variant="error" disabled={!selected}>
              Excluir
            </Button>
          </div>
          <div style={{ flex: 1 }} />
          <div>
            <Button variant="success" onClick={() => navigate('/new')}>
              Adicionar
            </Button>
          </div>
        </div>
        <Table.Container>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Th>Nome</Table.Th>
                <Table.Th>Serial</Table.Th>
                <Table.Th>Mac Address</Table.Th>
                <Table.Th>Tipo</Table.Th>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {devices.map(device => (
                <Table.Row
                  key={device.id}
                  onClick={() => handleSelect(device.id)}
                  className={clsx({
                    [styles.selected]: device.id === selected,
                  })}
                >
                  <Table.Td>{device.name}</Table.Td>
                  <Table.Td>{device.serial}</Table.Td>
                  <Table.Td>{device.macAddress}</Table.Td>
                  <Table.Td>{getTypeLabel(device.type)}</Table.Td>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Table.Container>
      </VStack>
    </Container>
  );
};

export default Home;
