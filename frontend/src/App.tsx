import Table from './components/Table';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '700px' }}>
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
            </Table.Body>
          </Table>
        </Table.Container>
      </div>
    </div>
  );
};

export default App;
