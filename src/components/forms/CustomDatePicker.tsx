'use client';

import * as React from 'react';

// MUI Imports
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField, { type TextFieldProps } from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, type DatePickerProps } from '@mui/x-date-pickers/DatePicker';

// Third Party Imports
import { type Dayjs } from 'dayjs';

interface CustomDatePickerProps extends Omit<DatePickerProps<Dayjs>, 'renderInput'> {
  label: string;
  error?: boolean;
  helperText?: React.ReactNode;
}

export default function CustomDatePicker({
  label,
  error,
  helperText,
  ...props
}: CustomDatePickerProps): React.JSX.Element {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker {...props}>
        {(params: TextFieldProps) => (
          <TextField {...params} label={label} error={error} helperText={helperText} fullWidth />
        )}
      </DatePicker>
    </LocalizationProvider>
  );
}
