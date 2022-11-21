import React, { MutableRefObject } from "react";

import cx from "classnames";

import { DefaultProps } from "../../types/types";
import styles from "./AerButton.module.scss";

type Props = DefaultProps<"button"> & {
  variant?: "primary" | "tertiary" | "important" | "default";
  type?: "button" | "submit" | "reset";
};

/**
 * The Button component exposes 3 variants, "dark" (primary), "tertiary", "important" as well as the default. It implements the following CSS variables from the global scope:
 */

// eslint-disable-next-line react/display-name
export const AerButton = React.forwardRef(
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

export default AerButton;
