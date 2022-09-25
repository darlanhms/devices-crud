import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import deviceSchema from '../../schemas/deviceSchema';

import FormInput from '../FormInput';
import { SubmitDeviceData } from '../../types/device';
import { VStack } from '../Stack';
import styles from './styles.module.css';
import InputMask from '../InputMask';
import FormControl from '../FormControl';
import FormLabel from '../FormLabel';
import Radio from '../Radio';
import FormHelperText from '../FormHelperText';
import Button from '../Button';

interface DeviceFormProps {
  onSubmit(data: SubmitDeviceData): void;
  initialData?: SubmitDeviceData;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm<SubmitDeviceData>({
    resolver: joiResolver(deviceSchema),
    defaultValues: {
      name: '',
      serial: '',
      macAddress: '',
      type: undefined,
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('serial', initialData.serial);
      setValue('macAddress', initialData.macAddress);
      setValue('type', initialData.type);
    }
  }, [initialData]);

  return (
    <form data-testid="device-form" onSubmit={handleSubmit(onSubmit)}>
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
        <Button variant="success" type="submit">
          Confirmar
        </Button>
      </div>
    </form>
  );
};

export default DeviceForm;
