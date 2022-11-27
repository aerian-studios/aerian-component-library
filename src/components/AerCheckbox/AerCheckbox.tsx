import React, { forwardRef, ReactElement, useEffect, useState } from "react";
import cx from "classnames";
import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";

import styles from "./AerCheckbox.module.scss";
import { DefaultProps } from "../../types/types";
import { errorMessage } from "../FormElements/FormElements.module.scss";

export type CheckedStates = boolean | "indeterminate";
const resolveNextState = (
  currentState: CheckedStates,
  checked: CheckedStates
) => (checked === "indeterminate" ? "indeterminate" : !currentState);

export const isLabelProps = (
  props: string | ReactElement | LabelProps
): props is LabelProps =>
  props && typeof props !== "string" && "hidden" in props;

export type LabelProps = { name: string | ReactElement; hidden: boolean };
export interface AerCheckboxProps extends DefaultProps<"input"> {
  // Required label for the checkbox. NOTE: you can hide the label using the `LabelProps` API, but must provide a label to make the field accessible
  label: string | ReactElement | LabelProps;
  // Value is what is returned from form submissions when the item is checked, so should ideally be set
  value: string;
  // The default state of the checkbox. NOTE: `indeterminate` can only be set/unset via this prop
  checked?: CheckedStates;
  // When using multiple checkboxes that are thematically linked, giving them all the same name allows for better data schematics
  name?: string;
  // The element to use as the box background. NOTE: to hide the box altogether, please provide an empty element
  checkBox?: ReactElement;
  // The element to use for the checked state
  checkedIcon?: ReactElement;
  // The element to use for the indeterminate state
  indeterminateIcon?: ReactElement;
  // Provide an errorOverride and bespoke message
  errorMessage?: string;
}
/**
 * Checkbox gives complete control over the display of the check box UI (though it comes with defaults) and has a consistent approach to validation.
 */
export const AerCheckbox = forwardRef(
  (
    {
      className,
      label,
      checked = false,
      indeterminateIcon = <DividerHorizontalIcon />,
      checkedIcon = <CheckIcon />,
      checkBox,
      errorMessage,
      ...rest
    }: AerCheckboxProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const defaultRef = React.useRef<HTMLInputElement | null>(null);
    const resolvedRef = ref || defaultRef;
    const [state, setState] = useState(checked);
    const [error, setError] = useState<string | undefined>(errorMessage);

    const errMessage = errorMessage || error;

    useEffect(() => {
      if (typeof resolvedRef !== "function" && resolvedRef.current) {
        resolvedRef.current.indeterminate = state === "indeterminate" ?? false;
      }
    }, [resolvedRef]);

    useEffect(() => {
      if (
        errMessage &&
        typeof resolvedRef !== "function" &&
        resolvedRef.current
      ) {
        resolvedRef.current.setCustomValidity(errMessage);
      }
    }, [resolvedRef]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((currentState) => resolveNextState(currentState, checked));

      if (errMessage) {
        const valid = event.target.validity;
        if (valid) {
          setError(undefined);
        }
      }

      rest.onChange && rest.onChange(event);
    };

    const handleChildBlur = (
      event: React.FocusEvent<HTMLInputElement, Element>
    ) => {
      const valid = event.target.validity.valid;

      // always trigger the local error handling
      if (!valid) {
        setError("This field is required");
      }
      // let parents know
      rest.onBlur && rest.onBlur(event);
    };
    console.log({ errMessage });

    return (
      <div className={styles.wrapper}>
        <label
          className={cx(styles.component, className, {
            [styles.invalid]: !!errMessage,
          })}
        >
          <span className={cx(styles.indicator)}>
            <input
              type="checkbox"
              checked={state === true}
              ref={resolvedRef}
              {...rest}
              className={styles.input}
              onChange={handleChange}
              onBlur={handleChildBlur}
            />
            <span
              aria-hidden
              className={cx(styles.imgWrapper, {
                [styles.checkBox]: !checkBox,
              })}
            >
              {checkBox}
              {state === "indeterminate" && indeterminateIcon}
              {state === true && checkedIcon}
            </span>
          </span>
          <span
            className={cx(styles.label, {
              [styles.visuallyHidden]: isLabelProps(label) && label.hidden,
            })}
          >
            {isLabelProps(label) ? label.name : label}
          </span>
        </label>
        {errMessage ? (
          <div className={styles.errorMessage} role="status">
            {errMessage}
          </div>
        ) : null}
      </div>
    );
  }
);
