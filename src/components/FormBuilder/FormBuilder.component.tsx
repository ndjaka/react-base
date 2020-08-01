import React from 'react';
import { Formik, Form, FormikErrors, FormikTouched } from 'formik';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import * as Yup from 'yup';
import styles from './FormBuilder.module.scss';
import { InputText } from 'components';

export interface FormClasses {
  readonly root?: string;
}

export interface FormInput {
  readonly name: string;
  readonly type?: string;
  readonly label?: string;
  readonly placeholder?: string;
  readonly variant?: 'standard' | 'outlined' | 'filled' | undefined;
  readonly classname?: string;
  readonly inputProps?: any;
  readonly contianerProps?: any;
  readonly autoFocus?: boolean;
  readonly fullWidth?: boolean;
}

export interface UseFormBuilderProps {
  readonly fields: FormInput[];
  readonly formRef?: React.RefObject<HTMLFormElement>;
  readonly validations: Object;
  readonly initialValues?: Object;
  readonly formProps?: Object;
  readonly formClasses?: FormClasses;
  readonly onSubmit: (values: Object, formikHelpers: any) => any;
  readonly renderSubmit?: (
    isSubmitting: boolean,
    errors: FormikErrors<Object>,
    touched: FormikTouched<Object>,
    handleSubmit: Function
  ) => any;
}

function FormBuilder(props: UseFormBuilderProps) {
  const {
    formRef,
    initialValues,
    validations = {},
    formProps = {},
    formClasses = {},
    fields = [],
    onSubmit = () => {},
    renderSubmit
  } = props;

  return (
    <Formik
      initialValues={initialValues || {}}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
      
        onSubmit(values, actions);
      }}
      validationSchema={Yup.object().shape(validations as any)}
      render={({
        values,
        handleBlur,
        handleChange,
        setFieldValue,
        errors,
        setErrors,
        touched,
        setFieldTouched,
        isSubmitting,
        handleSubmit
      }) => (
        <Form
          ref={formRef}
          className={clsx(styles.root, formClasses.root)}
          {...formProps}>
          <Grid container>
            {fields
              .filter((field) => field)
              .map(({ type = 'text', ...field }) => (
                <Grid item {...(field.contianerProps || {})}>
                  {['checkbox'].indexOf(type) !== -1 ? (
                    <div>checkbox</div>
                  ) : ['text', 'email', 'password'].indexOf(type) !== -1 ? (
                    <InputText
                      error={Boolean(
                        (touched as any)[field.name] &&
                          (errors as any)[field.name]
                      )}
                      fullWidth={field.fullWidth || false}
                      autoFocus={field.autoFocus || false}
                      helperText={
                        (touched as any)[field.name] &&
                        (errors as any)[field.name]
                      }
                      label={field.label}
                      name={field.name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type={type}
                      value={(values as any)[field.name]}
                      variant={field.variant || 'outlined'}
                      {...(field.inputProps || {})}
                    />
                  ) : (
                    <div />
                  )}
                </Grid>
              ))}
            {renderSubmit &&
              renderSubmit(isSubmitting, errors, touched, handleSubmit)}
          </Grid>
        </Form>
      )}
    />
  );
}

export default FormBuilder;
