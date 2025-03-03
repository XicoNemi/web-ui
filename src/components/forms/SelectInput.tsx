'use client';

import * as React from 'react';

// MUI Imports
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { type SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

// Third party imports
import { v4 as uuidV4 } from 'uuid';

interface SelectItem {
  value: string | number;
  label: string | React.ReactNode;
  disabled?: boolean;
}

interface SelectInputProps extends Omit<SelectProps, 'label'> {
  items: SelectItem[];
  disabled?: boolean;
  fullWidth?: boolean;
  hasError?: boolean;
  errorMessage?: string | React.ReactNode;
  labelId: string;
  label?: string | React.ReactNode;
}

export default function SelectInput({
  items,
  disabled,
  fullWidth,
  hasError,
  errorMessage,
  labelId,
  label,
  ...props
}: SelectInputProps): React.JSX.Element {
  const isDisabled = items?.length === 0 || disabled;

  const memoizedItems = React.useMemo(
    () =>
      items?.map((item) => (
        <MenuItem key={uuidV4()} value={item.value} disabled={item.disabled}>
          {item.label}
        </MenuItem>
      )) ?? [],
    [items]
  );

  return (
    <FormControl fullWidth={fullWidth} error={hasError} disabled={isDisabled}>
      <InputLabel id={labelId}>{label ?? 'label text'}</InputLabel>
      <Select labelId={labelId} label={label} {...props}>
        {memoizedItems}
      </Select>
      {hasError ? <FormHelperText error>{errorMessage}</FormHelperText> : null}
    </FormControl>
  );
}
