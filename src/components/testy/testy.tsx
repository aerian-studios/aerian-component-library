import React, { HTMLAttributes } from "react";

import styles from "./testy.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {

}

export const Testy: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <div className={styles.component} {...rest}>{children}</div>
    );
} 

export default Testy;
