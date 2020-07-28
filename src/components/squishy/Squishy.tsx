import React, { HTMLAttributes } from "react";

import styles from "./Squishy.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {

}

export const Squishy: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <div className={styles.component} {...rest}>{children}</div>
    );
} 

export default Squishy;
