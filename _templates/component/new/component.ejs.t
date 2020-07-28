---
to: src/components/<%= h.changeCase.camel(name) %>/<%= h.changeCase.camel(name) %>.tsx
---
import React, { HTMLAttributes } from "react";

import styles from "./<%= h.changeCase.camel(name) %>.module.scss";

interface Props extends HTMLAttributes<HTMLElement> {

}

export const <%= h.changeCase.pascal(name) %>: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <div className={styles.component} {...rest}>{children}</div>
    );
} 

export default <%= h.changeCase.pascal(name) %>;
