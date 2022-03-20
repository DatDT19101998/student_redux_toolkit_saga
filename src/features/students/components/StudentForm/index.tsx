import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAppSelector } from 'app/hooks';
import { citySelectOptions } from 'features/city/citySlice';
import { Student } from 'models';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import InputCustomField from '../FormFields/InputFIeld';
import RadioGroupCustomField from '../FormFields/RadioField';
import SelectCustomField from '../FormFields/SelectField';

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValue: Student) => void;
  isEdit: boolean;
}

export default function StudentForm({
  initialValues,
  onSubmit,
  isEdit,
}: StudentFormProps) {
  const cityOptions = useAppSelector(citySelectOptions);

  const [error, setError] = useState('');

  const schema = yup.object({
    name: yup
      .string()
      .required()
      .test(
        'two-words',
        'Please enter at least two words',
        (value) => (value as string)?.split(' ').filter((x) => x).length >= 2
      ),

    age: yup
      .number()
      .min(18, 'Min is 18')
      .max(70, 'Max is 70')
      .positive('Please enter a positive number !')
      .integer('Please enter an integer !')
      .required()
      .typeError('Please enter a valid age'),

    mark: yup
      .number()
      .positive('Please enter a positive number !')
      .required()
      .min(0, 'Min is 0')
      .max(10, 'Max is 10')
      .required(),

    gender: yup
      .string()
      .oneOf(['male', 'female'], 'Please select either male or female')
      .required(),

    city: yup.string().required('Please select city'),
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, dirtyFields },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  console.log('dirtyFields', dirtyFields);
  const handleFormSubmit = async (formValue: any) => {
    try {
      setError('');

      if (!onSubmit) return;

      await onSubmit(formValue);
    } catch (error: any) {
      setError(error?.message);
    }
  };

  return (
    <Box maxWidth={400}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <InputCustomField name="name" control={control} label="Full name" />

        <RadioGroupCustomField
          name="gender"
          control={control}
          label="Gender"
          options={[
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
          ]}
        />

        <InputCustomField
          name="age"
          control={control}
          label="Age"
          type="number"
        />

        <InputCustomField
          name="mark"
          control={control}
          label="Mark"
          type="number"
        />

        {Array.isArray(cityOptions) && cityOptions.length > 0 && (
          <SelectCustomField
            control={control}
            name="city"
            label={'City'}
            options={cityOptions}
          />
        )}

        {error && <Alert severity="error">{error}</Alert>}

        <Box mt={3}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            {isSubmitting && <CircularProgress size={16} />}
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </Box>
      </form>
    </Box>
  );
}
