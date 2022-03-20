import {
  FormControl,
  FormHelperText,
  FormLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  options: SelectOption[];
}

export default function SelectCustomField({
  name,
  control,
  label,
  disabled,
  options,
}: SelectFieldProps) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  //lib ui control Mui, Antd, Bootstrap....
  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      disabled={disabled}
      margin={'normal'}
      error={invalid}
    >
      <FormLabel id={`${name}_label`} component="legend">
        {label}
      </FormLabel>

      <Select
        labelId={`${name}_label`}
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
