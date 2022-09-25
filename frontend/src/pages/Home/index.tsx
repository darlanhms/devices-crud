import { useCallback, useEffect, useMemo, useState } from 'react';
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
import Modal from '../../components/Modal';
import deleteDevice from '../../lib/deleteDevice';

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
  const [open, setOpen] = useState(false);

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

  const handleDelete = async () => {
    if (!selected) {
      return;
    }

    try {
      await deleteDevice(selected);

      setDevices(devices.filter(device => device.id !== selected));
      setSelected(undefined);
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Erro ao listar dispositivos: ${error.message}`);
      } else {
        console.error(error);
      }
    }
  };

  const handleSelect = useCallback((id: string) => {
    setSelected(oldSelected => {
      if (id === oldSelected) {
        return undefined;
      }

      return id;
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const selectedDevice = useMemo(() => {
    return devices.find(device => device.id === selected);
  }, [selected]);

  return (
    <Container className={styles.container}>
      <VStack spacing={2}>
        <PageTitle>Dispositivos eletrônicos</PageTitle>
        <div className={styles.buttonsContainer}>
          <div className={styles.actionButtons}>
            <Button disabled={!selected} onClick={() => navigate(`/${selected}`)}>
              Editar
            </Button>
            <Button variant="error" disabled={!selected} onClick={() => setOpen(true)}>
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
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Confirmar exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o dispositivo eletrônico <b>{selectedDevice?.name}</b>?
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="error" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
