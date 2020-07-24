import React, { HTMLAttributes } from "react";
import cx from "classnames";

import styles from "./ContentWrapper.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {}

export const ContentWrapper: React.FC<Props> = ({ className, children }) => {
  return <div className={cx([styles.component, className])}>{children}</div>;
};

export default ContentWrapper;
