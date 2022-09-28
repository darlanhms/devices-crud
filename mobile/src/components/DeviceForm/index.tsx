import React, { useEffect } from 'react';
import { Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import FormInput from '../FormInput';
import InputMask from '../InputMask';
import styles from './styles';
import FormLabel from '../FormLabel';
import { SubmitDeviceData } from '../../types/device';
import theme from '../../styles/theme';
import deviceSchema from '../../schemas/deviceSchema';
import FormHelperText from '../FormHelperText';

const FormControl: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.formField}>{children}</View>;
};

interface DeviceFormProps {
  onSubmit(data: SubmitDeviceData): void;
  initialData?: SubmitDeviceData;
}

const DeviceForm: React.FC<DeviceFormProps> = ({ onSubmit, initialData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<SubmitDeviceData>({
    resolver: joiResolver(deviceSchema),
    defaultValues: {
      name: '',
      serial: '',
      macAddress: '',
      type: 'camera',
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('serial', initialData.serial);
      setValue('macAddress', initialData.macAddress);
      setValue('type', initialData.type);
    }
  }, [initialData]);

  return (
    <View testID="device-form" style={styles.container}>
      <FormControl>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              label="Nome"
              accessibilityLabel="Nome"
              error={!!errors.name}
              helperText={errors.name?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <Controller
          name="serial"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              accessibilityLabel="Serial"
              error={!!errors.serial}
              helperText={errors.serial?.message}
              label="Serial"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <Controller
          name="macAddress"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputMask
              format="##-##-##-##-##-##"
              accessibilityLabel="Mac address"
              label="Mac address"
              error={!!errors.macAddress}
              helperText={errors.macAddress?.message}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Tipo</FormLabel>
        <View style={styles.picker}>
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Picker
                testID="type-picker"
                selectedValue={value}
                onValueChange={itemValue => onChange(itemValue)}
              >
                <Picker.Item label="Câmera" value="camera" />
                <Picker.Item label="Sensor" value="sensor" />
                <Picker.Item label="Controle remoto" value="remoteControl" />
              </Picker>
            )}
          />
        </View>
        {errors.type && <FormHelperText error>{errors.type.message}</FormHelperText>}
      </FormControl>
      <View style={styles.button}>
        <Button color={theme.colors.primary} title="Confirmar" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

export default DeviceForm;
