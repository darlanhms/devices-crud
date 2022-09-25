import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '../../components/Button';
import Container from '../../components/Container';
import FormControl from '../../components/FormControl';
import FormHelperText from '../../components/FormHelperText';
import FormInput from '../../components/FormInput';
import FormLabel from '../../components/FormLabel';
import InputMask from '../../components/InputMask';
import PageTitle from '../../components/PageTitle';
import Radio from '../../components/Radio';
import { VStack } from '../../components/Stack';
import deviceSchema from '../../schemas/deviceSchema';

import styles from './styles.module.css';
import createDevice from '../../lib/createDevice';

const NewDevicePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(deviceSchema),
    defaultValues: {
      name: '',
      serial: '',
      macAddress: '',
      type: null,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <PageTitle>Novo Dispositivo</PageTitle>
        <VStack spacing={2} className={styles.formContainer}>
          <FormInput
            label="Nome"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register('name')}
          />
          <FormInput
            label="Serial"
            fullWidth
            error={!!errors.serial}
            helperText={errors.serial?.message}
            {...register('serial')}
          />
          <Controller
            name="macAddress"
            control={control}
            render={({ field: { onChange, ...rest } }) => (
              <InputMask
                label="Mac Address"
                format="##-##-##-##-##-##"
                fullWidth
                error={!!errors.macAddress}
                helperText={errors.macAddress?.message}
                onChangeValue={onChange}
                onChange={onChange}
                {...rest}
              />
            )}
          />
          <FormControl>
            <FormLabel>Tipo</FormLabel>
            <VStack spacing={0.5}>
              <Radio label="Câmera" value="camera" {...register('type')} />
              <Radio label="Sensor" value="sensor" {...register('type')} />
              <Radio label="Controle remoto" value="remoteControl" {...register('type')} />
            </VStack>
            {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
          </FormControl>
        </VStack>
        <div className={styles.submitButtons}>
          <Button variant="error" onClick={() => navigate('/')}>
            Cancelar
          </Button>
          <Button variant="success">Cadastrar</Button>
        </div>
      </form>
    </Container>
  );
};

export default NewDevicePage;
