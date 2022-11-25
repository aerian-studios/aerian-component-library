import React, { ComponentPropsWithRef, ForwardedRef } from "react";
import cx from "classnames";
import * as styles from "./AerAccordion.module.scss";
import { DefaultProps } from "../../types/types";
import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export interface AerAccordionHeaderProps
  extends DefaultProps<"button">,
    Accordion.AccordionTriggerProps {
  expandedIcon?: React.ReactElement;
}
/** The AerAccordionHeader represents the part of the accordion that is visible when the accordion item is closed */
export const AerAccordionHeader = React.forwardRef(
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

export const AerAccordionItem = Accordion.Item;

export interface AerAccordionContentProps
  extends DefaultProps<"div">,
    Accordion.AccordionContentProps {}
/** The AerAccordionContent represents the part of the accordion item that is revealed when the accordion item is open */
export const AerAccordionContent = React.forwardRef(
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

const isMultiAccordion = (
  props: Accordion.AccordionMultipleProps | Accordion.AccordionSingleProps
): props is Accordion.AccordionMultipleProps => props.type === "multiple";

type GuardedAccordion<
  AccordionType extends (
    | Accordion.AccordionSingleProps
    | Accordion.AccordionMultipleProps
  ) &
    React.RefAttributes<HTMLDivElement>
> = AccordionType extends Accordion.AccordionMultipleProps
  ? Accordion.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>
  : Accordion.AccordionSingleProps & React.RefAttributes<HTMLDivElement>;

/**
 * AerAccordion is a standard accordion pattern; it allows control over whether single or multiple elements can be open simultaneously, if it collapses, and what is open by default as well as providing control for the `value` of the component
 */
export function AerAccordion<
  AccordionType extends (
    | Accordion.AccordionMultipleProps
    | Accordion.AccordionSingleProps
  ) &
    React.RefAttributes<HTMLDivElement>
>({
  className,
  children,
  type = "multiple",
  ...rest
}: GuardedAccordion<AccordionType>) {
  return (
    <Accordion.Root
      className={cx(styles.accordionRoot, className)}
      type={type}
      {...rest}
    >
      {children}
    </Accordion.Root>
  );
}
