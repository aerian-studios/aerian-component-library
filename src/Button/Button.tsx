import React, { ButtonHTMLAttributes } from "react";
import cx from "classnames";
import styles from "./Button.module.scss";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "pagination" | "paginationActive";
  selectedClassName?: string;
  active?: boolean;
}

export const Button: React.FC<Props> = ({
  variant = "primary",
  selectedClassName,
  ...props
}) => (
  <button
    className={cx([
      styles[variant],
      selectedClassName && styles[selectedClassName],
    ])}
    {...props}
  >
    {props.children}
  </button>
);
export default Button;
