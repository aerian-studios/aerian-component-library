import React, { MutableRefObject } from "react";

import cx from "classnames";

import { DefaultProps } from "../../types/types";
import styles from "./Button.module.scss";

type Props = DefaultProps<"button"> & {
  variant?: "primary" | "tertiary" | "important" | "default";
  type?: "button" | "submit" | "reset";
};

/**
 * The Button component exposes 3 variants, "dark" (primary), "tertiary", "negative" and the default
 */

// eslint-disable-next-line react/display-name
export const Button = React.forwardRef(
  (
    { disabled, children, className, variant = "default", ...rest }: Props,
    ref:
      | MutableRefObject<HTMLButtonElement | null>
      | ((instance: HTMLButtonElement | null) => void)
      | null
  ) => (
    <button
      disabled={disabled}
      className={cx(
        className,
        variant && {
          [styles[variant]]: variant,
        }
      )}
      {...rest}
      ref={ref}
    >
      {children}
    </button>
  )
);

export default Button;
