import Button from './components/Button';
import Input from './components/Input';
import { VStack } from './components/Stack';

const App: React.FC = () => {
  return (
    <VStack spacing={3}>
      <Input label="Nome" />
      <Input placeholder="Simple input" helperText="Nome é obrigatório" error />
      <Input placeholder="Simple input" helperText="Nome é obrigatório" />
      <Input placeholder="Simple input" />
      <div>
        <Button>Normal button</Button>
      </div>
      <div>
        <Button variant="error">Error button</Button>
      </div>
      <div>
        <Button variant="success">Success button</Button>
      </div>
    </VStack>
  );
};

export default App;
