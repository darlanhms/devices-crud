import { View } from 'react-native';
import FormHelperText, { FormHelperTextProps } from '../FormHelperText';
import FormLabel, { FormLabelProps } from '../FormLabel';
import Input, { InputProps } from '../Input';

export interface FormInputProps extends InputProps {
  label?: string;
  helperText?: string;
  labelProps?: FormLabelProps;
  helperTextProps?: FormHelperTextProps;
}

const FormInput: React.FC<FormInputProps> = ({
  error,
  label,
  helperText,
  labelProps,
  helperTextProps,
  ...rest
}) => {
  return (
    <View>
      {label && <FormLabel {...labelProps}>{label}</FormLabel>}
      <Input error={error} {...rest} />
      {helperText && (
        <FormHelperText error={error} {...helperTextProps}>
          {helperText}
        </FormHelperText>
      )}
    </View>
  );
};

export default FormInput;
