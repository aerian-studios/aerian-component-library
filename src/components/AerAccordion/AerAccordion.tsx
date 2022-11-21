import React, { ForwardedRef } from "react";
import cx from "classnames";
import styles from "./AerAccordion.module.scss";
import { DefaultProps } from "../../types/types";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export interface AerAccordionHeaderProps
  extends DefaultProps<"button">,
    Accordion.AccordionTriggerProps {
  expandedIcon?: React.ReactElement;
}
/** The AerAccordionHeader represents the part of the accordion that is visible when the accordion item is closed */
const AerAccordionHeader = React.forwardRef(
  (
    { children, className, expandedIcon, ...props }: AerAccordionHeaderProps,
    forwardedRef: ForwardedRef<HTMLButtonElement>
  ) => (
    <Accordion.Header className={styles.accordionHeader}>
      <Accordion.Trigger
        className={cx(styles.accordionTrigger, className)}
        {...props}
        ref={forwardedRef}
      >
        {children}
        {expandedIcon ? (
          expandedIcon
        ) : (
          <ChevronDownIcon className={styles.accordionChevron} aria-hidden />
        )}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

export interface AerAccordionContentProps
  extends DefaultProps<"div">,
    Accordion.AccordionContentProps {}
/** The AerAccordionContent represents the part of the accordion item that is revealed when the accordion item is open */
const AerAccordionContent = React.forwardRef(
  (
    { children, className, ...props }: AerAccordionContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={cx(styles.accordionContent, className)}
      {...props}
      ref={forwardedRef}
    >
      <div className={styles.accordionContentText}>{children}</div>
    </Accordion.Content>
  )
);

//todo create a type guard based on the value of `type` to switch out which of these to use
export type AerAccordionProps =
  | Accordion.AccordionSingleProps
  | (Accordion.AccordionMultipleProps & DefaultProps<"div"> & {});
/**
 * AerAccordion is a standard accordion pattern; it allows control over whether single or multiple elements can be open simultaneously, if it collapses, and what is open by default as well as providing control for the `value` of the component
 */
export const AerAccordion = ({
  className,
  children,
  type,
  ...rest
}: AerAccordionProps) => {
  return (
    <Accordion.Root
      className={cx(styles.accordionRoot, className)}
      type={type}
      {...rest}
    >
      {children}
    </Accordion.Root>
  );
};
