import React from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import styles from './InputText.module.scss';

const InputText = (props: TextFieldProps) => {
  return (
    <TextField
      classes={{
        root: styles.root
      }}
      {...props}
    />
  );
};

export default InputText;
