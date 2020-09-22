import React, { useCallback, HTMLAttributes, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import cx from "classnames";

import ReactSelect from "react-select";

import styles from "./FormElements.module.scss";
import { useFormContext } from "../Form/useFormContext";
import { Controller } from "react-hook-form";

interface Props<T = HTMLInputElement> extends HTMLAttributes<T> {
  hideLabel?: boolean;
  label: string;
  name: string;
}

interface FormInputProps extends Props {
  type?: string;
  errorMessage?: string;
}

interface FormTextAreaProps extends Props<HTMLTextAreaElement> {
  errorMessage?: string;
}

interface FormInputGroupProps extends Props<HTMLFieldSetElement> {
  type?: "radio" | "checkbox";
  options: Array<Omit<RadioInputProps, "name">>;
  optionsClassName?: string;
}

interface RadioInputProps extends HTMLAttributes<HTMLElement> {
  label: string;
  value: string;
  name: string;
  type?: "radio" | "checkbox";
  defaultChecked?: boolean;
}

interface SelectOption {
  label: string;
  value?: string;
}

interface SelectedDropdownItem {
  name: string;
  label?: string;
  value: string;
}

interface SelectProps extends Omit<Props, "defaultValue" | "onChange"> {
  defaultValue?: SelectOption;
  controlledDefault?: SelectOption;
  label: string;
  options: SelectOption[];
  isMulti?: boolean;
  onChange?: (
    selectedOption: SelectedDropdownItem | SelectedDropdownItem[]
  ) => void;
}

interface WrapComponentProps extends Record<string, any> {
  name: string;
  label: string;
  Component: React.FC<any>;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  label,
  name,
  type = "text",
  hideLabel = false,
  errorMessage,
  ...rest
}) => {
  const { register, errors } = useFormContext("FormInput");

  return (
    <div className={cx([styles.formItem, className])}>
      {!hideLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        aria-label={label}
        ref={register}
        aria-describedby={`err-${name}`}
        aria-invalid={!!errors[name]}
        className={styles.input}
        {...rest}
      />
      {/* disclosure pattern */}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span
            id={`err-${name}`}
            className={styles.errorMessage}
            aria-live="polite"
          >
            {errorMessage ?? message}
          </span>
        )}
      ></ErrorMessage>
    </div>
  );
};

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  className,
  label,
  name,
  hideLabel = false,
  errorMessage,
  ...rest
}) => {
  const { register, errors } = useFormContext("TextArea");

  return (
    <div className={cx([styles.formItem, className])}>
      {!hideLabel && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        aria-label={label}
        ref={register}
        aria-describedby={`err-${name}`}
        aria-invalid={!!errors[name]}
        className={styles.textArea}
        {...rest}
      />
      {/* disclosure pattern */}
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <span
            id={`err-${name}`}
            className={styles.errorMessage}
            aria-live="polite"
          >
            {errorMessage ?? message}
          </span>
        )}
      ></ErrorMessage>
    </div>
  );
};

export const RadioOrCheckInput: React.FC<RadioInputProps> = ({
  className,
  type = "radio",
  label,
  name,
  value,
  defaultChecked,
  ...rest
}) => {
  const { register } = useFormContext("RadioInput");

  return (
    <div key={value} className={cx([styles.radioOrCheckButton, className])}>
      <input
        id={value}
        name={name}
        type={type}
        value={value}
        ref={register}
        defaultChecked={defaultChecked}
        {...rest}
      />
      <label htmlFor={value} className={styles.radioOrCheckButtonLabel}>
        {label}
      </label>
    </div>
  );
};

export const FormInputGroup: React.FC<FormInputGroupProps> = ({
  className,
  hideLabel,
  label,
  name,
  options,
  optionsClassName,
  type = "radio",
  ...rest
}) => {
  return (
    <fieldset
      name={name}
      className={cx([styles.formItem, styles.formItemGroup, className])}
      aria-label={label}
      {...rest}
    >
      {!hideLabel && <legend className={styles.label}>{label}</legend>}

      <div className={cx([styles.radioOrCheckButtonGroup, optionsClassName])}>
        {options.map(({ value, label, defaultChecked, ...optionsRest }) => (
          <RadioOrCheckInput
            key={value}
            label={label}
            name={name}
            value={value}
            type={type}
            defaultChecked={defaultChecked}
            {...optionsRest}
          />
        ))}
      </div>
    </fieldset>
  );
};

export const Select: React.FC<SelectProps> = ({
  label,
  controlledDefault,
  options,
  className,
  onChange,
  isMulti = false,
}) => {
  const selectId = label.replace(/\s+/g, "-").toLowerCase();

  const setSelection = useCallback(
    (selectedOption) => {
      if (!selectedOption) {
        return onChange({ name: selectId, label: null, value: null });
      }

      if (Array.isArray(selectedOption)) {
        return onChange(selectedOption);
      }

      const name = selectId;
      const { label, value } = selectedOption;
      return onChange({ name, label, value });
    },
    [onChange, selectId]
  );

  return (
    <div className={className}>
      <div className={styles.label}>
        <label htmlFor={selectId}>{label}</label>
      </div>

      <ReactSelect
        id={selectId}
        name={selectId}
        defaultValue={controlledDefault || options[0]}
        options={options}
        onChange={setSelection}
        isMulti={isMulti}
      />
    </div>
  );
};

export const FormSelect: React.FC<SelectProps> = ({
  label,
  name,
  options,
  defaultValue,
  className,
  ...rest
}) => (
  <ControlledElement
    Component={Select}
    name={name}
    label={label}
    options={options}
    defaultValue={defaultValue || options[0]}
    controlledDefault={defaultValue || options[0]}
    className={className}
    {...rest}
  ></ControlledElement>
);

// typings - pass in component props
export const ControlledElement: React.FC<WrapComponentProps> = ({
  Component,
  name,
  label,
  defaultValue,
  ...rest
}) => {
  const { control } = useFormContext(name);
  return (
    <Controller
      control={control}
      as={Component}
      name={name}
      label={label}
      defaultValue={defaultValue}
      {...rest}
    />
  );
};

interface TagSelectorProps {
  label?: string;
  name: string;
  wrapperStyle?: string;
  tagStyle?: string;
  inputStyle?: string;
}

export const FormTagSelector: React.FC<TagSelectorProps> = ({
  label,
  name,
  wrapperStyle,
  tagStyle,
  inputStyle,
}) => {
  const { setValue: setFormValue, register } = useFormContext("TagSelector");

  const inputRef = React.createRef<HTMLInputElement>();

  const [tags, setTags] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>("");

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTags([...tags, value]);
      setValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const deleteTag = (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string
  ) => {
    event.preventDefault();
    let newTags = [...tags];
    newTags.splice(tags.indexOf(tag), 1);
    setTags(newTags);
    setFormValue(name, newTags);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    inputRef.current.focus();
  };

  useEffect(() => {
    setFormValue(name, tags);
  }, [tags]);

  useEffect(() => {
    register(name);
  }, []);

  const Tags: React.FC = () => (
    <>
      {tags.map((tag) => (
        <div key={tag} className={cx(styles.tagStyle, tagStyle)}>
          <span className={styles.tagText}>{tag}</span>
          <button
            className={styles.deleteTagButton}
            aria-label={`Delete ${tag}`}
            onClick={(event) => deleteTag(event, tag)}
          >
            <svg
              height="14"
              width="14"
              viewBox="0 0 20 20"
              aria-hidden="true"
              focusable="false"
              className="css-6q0nyr-Svg"
            >
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z" />
            </svg>
          </button>
        </div>
      ))}
    </>
  );

  return (
    <>
      <div className={styles.label}>
        <label htmlFor={name}>{label}</label>
      </div>
      <div
        className={cx(styles.tagWrapper, wrapperStyle)}
        onClick={handleClick}
      >
        <div className={styles.tags}>
          {tags && <Tags />}
          <input
            id={name}
            ref={inputRef}
            name={name}
            type="text"
            value={value}
            className={cx(styles.tagInput, inputStyle)}
            onKeyPress={(event) => handleKeyPress(event)}
            onChange={(event) => handleChange(event)}
          />
        </div>
      </div>
    </>
  );
};
