/* eslint-disable  */
import React, { forwardRef } from 'react';
import FormControl, { FormControlProps } from '../FormControl';
import FormHelperText, { FormHelperTextProps } from '../FormHelperText';
import FormLabel, { FormLabelProps } from '../FormLabel';
import Input, { InputProps } from '../Input';

export interface FormInputProps extends InputProps {
  label?: string;
  helperText?: string;
  controlProps?: FormControlProps;
  labelProps?: FormLabelProps;
  helperTextProps?: FormHelperTextProps;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ error, label, helperText, controlProps, labelProps, helperTextProps, ...rest }, ref) => {
    return (
      <FormControl {...controlProps}>
        {label && <FormLabel {...labelProps}>{label}</FormLabel>}
        <Input ref={ref} {...rest} error={error} />
        {helperText && (
          <FormHelperText {...helperTextProps} error={error}>
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);

export default FormInput;
