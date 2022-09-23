import Button from '../../components/Button';
import { VStack } from '../../components/Stack';
import Table from '../../components/Table';
import styles from './styles.module.css';

const Home: React.FC = () => {
  return (
    <VStack spacing={2} className={styles.container}>
      <h3 className={styles.title}>Dispositivos eletrônicos</h3>
      <div className={styles.buttonsContainer}>
        <div className={styles.actionButtons}>
          <Button disabled>Editar</Button>
          <Button variant="error" disabled>
            Excluir
          </Button>
        </div>
        <div style={{ flex: 1 }} />
        <div>
          <Button variant="success">Adicionar</Button>
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
            <Table.Row>
              <Table.Td>Câmera da sala</Table.Td>
              <Table.Td>asjkdfj192839asda</Table.Td>
              <Table.Td>09-A8-34-23-12</Table.Td>
              <Table.Td>Câmera</Table.Td>
            </Table.Row>
            <Table.Row>
              <Table.Td>Câmera da sala</Table.Td>
              <Table.Td>asjkdfj192839asda</Table.Td>
              <Table.Td>09-A8-34-23-12</Table.Td>
              <Table.Td>Câmera</Table.Td>
            </Table.Row>
            <Table.Row>
              <Table.Td>Câmera da sala</Table.Td>
              <Table.Td>asjkdfj192839asda</Table.Td>
              <Table.Td>09-A8-34-23-12</Table.Td>
              <Table.Td>Câmera</Table.Td>
            </Table.Row>
            <Table.Row>
              <Table.Td>Câmera da sala</Table.Td>
              <Table.Td>asjkdfj192839asda</Table.Td>
              <Table.Td>09-A8-34-23-12</Table.Td>
              <Table.Td>Câmera</Table.Td>
            </Table.Row>
          </Table.Body>
        </Table>
      </Table.Container>
    </VStack>
  );
};

export default Home;
