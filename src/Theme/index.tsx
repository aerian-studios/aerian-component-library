import React, { HTMLAttributes } from "react";
import cx from "classnames";

interface Options extends HTMLAttributes<HTMLElement> {}

export const applyTheme = <T extends Options>(
  Component: React.FC<T>,
  options: T
) => (props: T) => {
  return (
    <Component
      {...props}
      className={cx([options.className, props.className])}
    />
  );
};

export default applyTheme;
