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
  ({ error, label, helperText, controlProps, labelProps, helperTextProps, name, ...rest }, ref) => {
    const labelName = name ? name + '-label' : undefined;

    return (
      <FormControl {...controlProps}>
        {label && <FormLabel id={labelName} {...labelProps}>{label}</FormLabel>}
        <Input {...rest} aria-labelledby={labelName} ref={ref} name={name} error={error} />
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
