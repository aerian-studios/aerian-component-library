import React, { type HTMLAttributes } from "react";
import * as yup from "yup";
import { type DefaultValues, useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import cx from "classnames";

import { FormContext } from "./useFormContext";

import styles from "./Form.module.scss";

export interface FormProps<T extends object>
  extends HTMLAttributes<HTMLElement> {
  validationSchema: Record<string, YupTypes>;
  onSubmitFn: SubmitHandler<T>;
  onResetFn?: () => void;
}

type YupTypes = yup.StringSchema<string> | yup.ObjectSchema<object>;

interface FormContentsProps extends HTMLAttributes<HTMLElement> {}

interface FormControlsProps extends HTMLAttributes<HTMLElement> {
  submitButtonText?: string;
  resetButtonText?: string;
  loading?: boolean;
  loadingIcon?: JSX.Element;
}

export const FormContents: React.FC<FormContentsProps> = ({
  children,
  className,
  ...rest
}) => (
  <div className={cx([styles.formContents, className])} {...rest}>
    {children}
  </div>
);

export const FormControls: React.FC<FormControlsProps> = ({
  className,
  submitButtonText = "Submit",
  resetButtonText = "Clear",
  loading,
  loadingIcon = "Loading...",
  ...rest
}) => (
  <div className={cx([styles.formControls, className])} {...rest}>
    <button type="submit" disabled={loading}>
      {loading ? loadingIcon : submitButtonText}
    </button>

    <button type="reset" disabled={loading}>
      {resetButtonText}
    </button>
  </div>
);

export function Form<T extends DefaultValues<Record<string, string | object>>>({
  children,
  className,
  onSubmitFn,
  onResetFn,
  validationSchema,
  ...rest
}: FormProps<T>) {
  const wrappedValidationSchema = yup.object().shape(validationSchema);

  const [defaultValues, setDefaultValues] = React.useState<
    T
  >();

  const methods = useForm<T>({
    resolver: yupResolver(wrappedValidationSchema),
  });

  // on reset use reset to the intial values
  const handleReset = () => {
    methods.reset(defaultValues);
    onResetFn?.();
  };

  // when form loads set its initial values as defaults
  React.useEffect(() => {
    const defaults = methods.getValues();
    setDefaultValues(defaults);
  }, []);

  return (
    <FormContext.Provider value={{ ...methods }}>
      <form
        onSubmit={methods.handleSubmit(onSubmitFn)}
        onReset={handleReset}
        className={className}
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}
