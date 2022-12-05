import React, { forwardRef, ReactElement, useState } from "react";
import cx from "classnames";
import styles from "./AerRadioGroup.module.scss";
import { DefaultProps } from "../../types/types";
import { DotFilledIcon } from "@radix-ui/react-icons";

export const isLabelProps = (
  props: string | ReactElement | LabelProps
): props is LabelProps => typeof props === "object" && "hidden" in props;

export type LabelProps = { name: string | ReactElement; hidden: boolean };

export interface AerRadioButtonProps extends DefaultProps<"input"> {
  // Required label for the radio. NOTE: you can hide the label using the `LabelProps` API, but must provide a label to make the field accessible
  label: string | ReactElement | LabelProps;
  // Value is what is returned from form submissions when the item is checked, so should ideally be set
  value: string;
  // The default state of the radio.
  defaultChecked?: boolean;
  // The element to use as the radio background. NOTE: to hide the box altogether, please provide an empty element
  radioBackground?: ReactElement;
  // The element to use for the checked state
  checkedIcon?: ReactElement;
  // Use the appropriate props to fill the radio
  children?: never;
}
/**
 * AerRadioGroup.Item is a typical radio input
 */
export const AerRadioButton = forwardRef(
  (
    {
      className,
      value,
      label,
      defaultChecked,
      radioBackground,
      checkedIcon = <DotFilledIcon className={styles.checkedIcon} />,
      checked,
      ...rest
    }: AerRadioButtonProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [state, setState] = useState(defaultChecked || checked);

    const dataDisabled: Record<string, true | never> = {};
    if ("disabled" in rest) {
      dataDisabled["data-disabled"] = true;
    }
    return (
      <label className={cx(styles.radioInput, className)} {...dataDisabled}>
        <span className={cx(styles.indicator)}>
          <input
            role="radio"
            type="radio"
            checked={state === true}
            ref={ref}
            {...rest}
            className={styles.input}
          />
          <span
            aria-hidden
            className={cx(styles.imgWrapper, {
              [styles.radioBackground]: !radioBackground,
            })}
          >
            {radioBackground}
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
    );
  }
);

export interface AerRadioGroupProps extends DefaultProps<"div"> {}
/**
 * AerRadioGroup allows automatic control of accessible radio buttons
 */
export const AerRadioGroup = forwardRef(
  (
    { className, children, ...rest }: AerRadioGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cx(styles.component, className)}
        {...rest}
        role="radiogroup"
        ref={ref}
      >
        {children}
      </div>
    );
  }
);
