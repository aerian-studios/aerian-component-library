import React, {
  FormEvent,
  FormEventHandler,
  forwardRef,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";
import cx from "classnames";
import styles from "./AerRadioGroup.module.scss";
import { DefaultProps } from "../../types/types";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { isObject, isReactElement } from "../../utils/dataStructures";

export const isLabelProps = (
  props: string | ReactElement | LabelProps
): props is LabelProps => typeof props === "object" && "hidden" in props;

export type LabelProps = { name: string | ReactElement; hidden: boolean };

export type Selectable = {
  value: string;
  checked?: boolean;
  onChange?: (event: Event) => void;
};

export interface AerRadioButtonProps extends DefaultProps<"input">, Selectable {
  // Required label for the radio. NOTE: you can hide the label using the `LabelProps` API, but must provide a label to make the field accessible
  label: string | ReactElement | LabelProps;
  // Value is what is returned from form submissions when the item is checked, so should ideally be set
  value: string;
  // The default state of the radio.
  checked?: boolean;
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
      radioBackground,
      checked,
      checkedIcon = <DotFilledIcon className={styles.checkedIcon} />,
      onChange,
      ...rest
    }: AerRadioButtonProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
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
            {...rest}
            checked={checked}
            ref={ref}
            className={cx(styles.input, className)}
            onChange={onChange}
          />
          <span
            aria-hidden
            className={cx(styles.imgWrapper, {
              [styles.radioBackground]: !radioBackground,
            })}
          >
            {radioBackground}
            {checked && checkedIcon}
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

const implementsTheSelectableInterface = (obj: unknown): obj is Selectable =>
  isObject(obj) &&
  "value" in obj &&
  ("label" in obj || "checked" in obj || "defaultChecked" in obj);

export interface AerRadioGroupProps extends DefaultProps<"div"> {
  // the value of the default selected radio
  value: string;
}
/**
 * AerRadioGroup allows automatic control of accessible radio buttons
 */
export const AerRadioGroup = forwardRef(
  (
    { className, children, value, ...rest }: AerRadioGroupProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const [selected, setSelected] = useState<string>(value);

    console.log(selected);

    const getHandleChange =
      (value: string, cb?: ((ev: Event) => any) | null) => (ev: Event) => {
        setSelected(() => value);

        cb && cb(ev);
      };

    const trainedChildren = useMemo(() => {
      const findRadioButtonsAndApplyProps = (node: ReactNode): ReactNode => {
        return React.Children.map(node, (child): ReactNode => {
          if (!isReactElement(child) || typeof child.props !== "object") {
            return child;
          }

          if (implementsTheSelectableInterface(child.props)) {
            const typedChild: ReactElement<Selectable> = child;

            const onChange = getHandleChange(
              typedChild.props.value,
              typedChild.props.onChange
            );

            const checked = selected === typedChild.props.value;

            const clone = React.cloneElement(typedChild, {
              ...typedChild.props,
              onChange: onChange,
              checked: checked,
            });

            return clone;
          } else {
            return findRadioButtonsAndApplyProps(child.props.children);
          }
        });
      };

      return findRadioButtonsAndApplyProps(children);
    }, []);

    return (
      <div
        className={cx(styles.component, className)}
        {...rest}
        role="radiogroup"
        ref={ref}
      >
        {trainedChildren}
      </div>
    );
  }
);
