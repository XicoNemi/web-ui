import React from 'react';

// MUI Imports
import styled from '@mui/material/styles/styled';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

const CustomTextField = styled((props: TextFieldProps) => (
  <TextField error={props.error} helperText={props.error ? props.helperText : ''} {...props} />
))(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
}));

export default CustomTextField;
