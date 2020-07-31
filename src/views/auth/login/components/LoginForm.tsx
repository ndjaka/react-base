import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Box, Button, Grid } from '@material-ui/core';
import { FormBuilder, FormInput } from 'components';
import { loginEffect } from 'store/effects';
import { ApplicationState } from 'store/types';
import { Alert } from '@material-ui/lab';

interface LoginFormProps {
  className?: string;
  onSubmitSuccess?: Function;
}

function LoginForm(props: LoginFormProps) {
  const { className, onSubmitSuccess, ...rest } = props;
  const dispatch = useDispatch();
  const formRef = React.createRef<HTMLFormElement>();
  const {
    loading: { login_failed, login_failed_message }
  } = useSelector((state: ApplicationState) => state.account);
  const [formAction, setFormAction] = useState({
    setErrors: (data: object) => {},
    setStatus: (data: object) => {},
    setSubmitting: (status: boolean) => {}
  });

  React.useEffect(() => {
    if (login_failed) {
      formAction.setSubmitting(false);
      formAction.setStatus({ success: false });
      formAction.setErrors({ submit: login_failed_message });
    }
  }, [login_failed, login_failed_message, formAction]);

  const fields: FormInput[] = [
    {
      name: 'email',
      autoFocus: true,
      fullWidth: true,
      label: 'Email Address',
      type: 'email',
      variant: 'outlined',
      inputProps: {
        margin: 'normal'
      },
      contianerProps: {
        xs: 12
      }
    },
    {
      name: 'password',
      autoFocus: true,
      fullWidth: true,
      label: 'Mot de passe',
      type: 'password',
      variant: 'outlined',
      inputProps: {
        margin: 'normal'
      },
      contianerProps: {
        xs: 12
      }
    }
  ];
  const validations: Object = {
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    password: Yup.string().max(255).required('Password is required')
  };
  const initialValues = {
    email: 'admin@test.com',
    password: 'password',
    submit: false
  };

  return (
    <div>
      {login_failed && (
        <Box mt={2}>
          <Alert severity="error">
            <div>{login_failed_message}</div>
          </Alert>
        </Box>
      )}
      <FormBuilder
        formRef={formRef}
        fields={fields}
        validations={validations}
        initialValues={initialValues}
        formProps={{
          noValidate: true,
          ...rest
        }}
        renderSubmit={(
          isSubmitting,
          errors: any,
          touched: any,
          handleSubmit: any
        ) => (
          <Grid xs={12}>
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                onClick={handleSubmit}
                variant="contained">
                Log In
              </Button>
            </Box>
          </Grid>
        )}
        onSubmit={async (
          values: any,
          { setErrors, setStatus, setSubmitting }
        ) => {
          await setFormAction({ setErrors, setStatus, setSubmitting });
          await dispatch(loginEffect(values.email, values.password));
        }}
      />
    </div>
  );
}

export default LoginForm;
