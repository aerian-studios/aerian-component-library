import React, { useCallback, useEffect, HTMLAttributes } from "react";
import { Controller } from "react-hook-form";
import cx from "classnames";
import { ErrorMessage } from "@hookform/error-message";

import ReactSelect from "react-select";

import Icon from "../Icons";

import styles from "./FormElements.module.scss";
import { useFormContext } from "../Form/useFormContext";

interface Props<T = HTMLInputElement> extends HTMLAttributes<T> {
  label: string;
  name: string;
}

interface FormInputProps extends Props {
  type?: string;
  errorMessage?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  className,
  label,
  name,
  type = "text",
  errorMessage,
  ...rest
}) => {
  const { register, errors } = useFormContext("FormInput");

  return (
    <div className={cx([styles.formItem, className])}>
      
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      
      <input
        id={name}
        name={name}
        type={type}
        ref={register}
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

interface FormTextAreaProps extends Props<HTMLTextAreaElement> {
  errorMessage?: string;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({
  className,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  const { register, errors } = useFormContext("TextArea");

  return (
    <div className={cx([styles.formItem, className])}>
      
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      
      <textarea
        id={name}
        name={name}
        ref={register}
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

interface RadioInputProps extends HTMLAttributes<HTMLElement> {
  label: string;
  value: string;
  name: string;
  type?: "radio" | "checkbox";
  defaultChecked?: boolean;
}

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

interface FormInputGroupProps extends Props<HTMLFieldSetElement> {
  type?: "radio" | "checkbox";
  options: Array<Omit<RadioInputProps, "name">>;
  optionsClassName?: string;
}

export const FormInputGroup: React.FC<FormInputGroupProps> = ({
  className,
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
      <legend className={styles.label}>{label}</legend>

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

interface SelectOption {
  label: string;
  value?: string;
}

interface SelectedDropdownItem {
  name: string;
  label?: string;
  value: string;
}

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
        aria-label={label}
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

interface WrapComponentProps extends Record<string, any> {
  name: string;
  label: string;
  Component: React.FC<any>;
}

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

interface TagSelectorProps extends Props {
  tagClassName?: string;
  inputClassName?: string;
}

export const FormTagSelector: React.FC<TagSelectorProps> = ({
  className,
  label,
  name,
  inputClassName,
  tagClassName,
}) => {
  const { setValue, register } = useFormContext("TagSelector");

  const inputRef = React.createRef<HTMLInputElement>();

  const [inputValue, setInputValue] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTags([...tags, inputValue]);
      setValue(name, [...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const deleteTag = (
    event: React.MouseEvent<HTMLButtonElement>,
    tag: string
  ) => {
    event.preventDefault();
    let newTags = [...tags];
    newTags.splice(tags.indexOf(tag), 1);
    setTags(newTags);
    setValue(name, newTags);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    inputRef.current.focus();
  };

  useEffect(() => {
    register(name);
  }, []);

  const Tags: React.FC = () => (
    <>
      {tags.map((tag) => (
        <div key={tag} className={cx(styles.tag, tagClassName)}>
          <span className={styles.tagText}>{tag}</span>
          <button
            className={styles.deleteTagButton}
            aria-label={`Delete ${tag}`}
            onClick={(event) => deleteTag(event, tag)}
          >
           <Icon name="cross" />
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
        className={cx(styles.tagComponent, className)}
        onClick={handleClick}
      >
        <div className={styles.tags}>
          {tags && <Tags />}
          <input
            id={name}
            type="text"
            ref={inputRef}
            className={cx(styles.tagInput, inputClassName)}
            name={name}
            value={inputValue}
            onKeyPress={(event) => handleKeyPress(event)}
            onChange={(event) => handleChange(event)}
          />
        </div>
      </div>
    </>
  );
};
