import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import Container from '../../components/Container';
import FormControl from '../../components/FormControl';
import FormInput from '../../components/FormInput';
import FormLabel from '../../components/FormLabel';
import InputMask from '../../components/InputMask';
import PageTitle from '../../components/PageTitle';
import Radio from '../../components/Radio';
import { VStack } from '../../components/Stack';

import styles from './styles.module.css';

const NewDevicePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container className={styles.container}>
      <PageTitle>Novo Dispositivo</PageTitle>
      <VStack spacing={2} className={styles.formContainer}>
        <FormInput label="Nome" fullWidth />
        <FormInput label="Serial" fullWidth />
        <InputMask label="Mac Address" format="##-##-##-##-##-##" fullWidth />
        <FormControl>
          <FormLabel>Tipo</FormLabel>
          <VStack spacing={0.5}>
            <Radio name="type" label="Câmera" />
            <Radio name="type" label="Sensor" />
            <Radio name="type" label="Controle remoto" />
          </VStack>
        </FormControl>
      </VStack>
      <div className={styles.submitButtons}>
        <Button variant="error" onClick={() => navigate('/')}>
          Cancelar
        </Button>
        <Button variant="success">Cadastrar</Button>
      </div>
    </Container>
  );
};

export default NewDevicePage;
