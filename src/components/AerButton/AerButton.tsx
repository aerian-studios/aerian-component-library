import React, { MutableRefObject } from "react";

import cx from "classnames";

import { DefaultProps } from "../../types/types";
import styles from "./Button.module.scss";

type Props = DefaultProps<"button"> & {
  variant?: "primary" | "tertiary" | "important" | "default";
  type?: "button" | "submit" | "reset";
};

/**
 * The Button component exposes 3 variants, "dark" (primary), "tertiary", "important" as well as the default. It implements the following CSS variables from the global scope:
 * ```
 * --c-button: var(--c-cobalt);
  --c-button-bg: var(--c-white);
  --c-button-border: var(--c-cobalt);
  --c-button-hover: var(--c-luminous-vivid-amber);
  --c-button-hover-bg: var(--c-white);
  --c-button-hover-border: var(--c-luminous-vivid-amber);
  --c-button-disabled: var(--c-gray-600);
  --c-button-disabled-bg: var(--c-gray-200);
  // Primary
  --c-button-primary: var(--c-cobalt);
  --c-button-primary-bg: var(--c-vivid-green-cyan);
  --c-button-primary-border: var(--c-cobalt);
  --c-button-primary-hover: var(--c-cobalt);
  --c-button-primary-hover-bg: var(--c-luminous-vivid-amber);
  --c-button-primary-hover-border: var(--c-cobalt);
  --c-button-primary-disabled: var(--c-gray-600);
  --c-button-primary-disabled-bg: var(--c-gray-200);
  // Important/negative
  --c-button-important: var(--c-white);
  --c-button-important-bg: var(--c-negative);
  --c-button-important-border: var(--c-negative);
  --c-button-important-hover: var(--c-cobalt);
  --c-button-important-hover-bg: var(--c-luminous-vivid-amber);
  --c-button-important-hover-border: var(--c-cobalt);
  --c-button-important-disabled: var(--c-gray-600);
  --c-button-important-disabled-bg: var(--c-gray-200);
  // (buttons that look like links)
  --c-button-tertiary: var(--c-link);
  --c-button-tertiary-bg: transparent;
  --c-button-tertiary-border: transparent;
  --c-button-tertiary-hover: var(--c-link-hover);
  --c-button-tertiary-hover-border: transparent;
  --c-button-tertiary-hover-bg: transparent;
  --c-button-tertiary-disabled: var(--c-link-disabled);
  --c-button-tertiary-disabled-bg: transparent;
  ```
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
