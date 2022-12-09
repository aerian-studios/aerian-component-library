import React, { ForwardedRef, forwardRef, ReactElement } from "react";
import cx from "classnames";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./AerAlertDialog.module.scss";
import { DefaultProps, HideableTextShape } from "../../types/types";
import { elementIsHideableTextShape } from "../../utils/dataStructures";
import { AerButton } from "../AerButton";

export interface AlertDialogFooterProps extends DefaultProps<"footer"> {
  /** A button or link to cancel the alert dialog */
  cancel?: ReactElement<HTMLButtonElement | HTMLAnchorElement>;
  /** A button or link to trigger the alert dialog action */
  action?: ReactElement<HTMLButtonElement | HTMLAnchorElement>;
}

export const AerAlertDialogFooter = forwardRef(
  (
    { cancel, action, ...rest }: AlertDialogFooterProps,
    ref: ForwardedRef<HTMLElement>
  ) => (
    <footer {...rest} ref={ref}>
      {cancel ? (
        <AlertDialog.Cancel asChild>{cancel}</AlertDialog.Cancel>
      ) : null}
      <AlertDialog.Action asChild>{action}</AlertDialog.Action>
    </footer>
  )
);

export interface AerAlertDialogProps extends DefaultProps<"div"> {
  /** A button to trigger the alert dialog to open */
  trigger: ReactElement<HTMLButtonElement>;
  /** The title and whether to hide it (this defaults to `false`). NOTE: This is placed in an `<h2>`. */
  dialogTitle: string | ReactElement<unknown> | HideableTextShape;
  /** The body content of the alert. NOTE: This will take the form of the element that you pass in. */
  children: ReactElement<unknown>;
  /** An element that will handle layout and content (an action and an optional cancel button) for the dialog's footer */
  footer?: ReactElement<AlertDialogFooterProps>;
}
/**
 * The AlertDialog interrupts a user's workflow to communicate an important message that requires a response. *NOTE:* This is different from the Dialog component
 */
export const AerAlertDialog = ({
  className,
  trigger,
  dialogTitle,
  footer,
  children,
  ...rest
}: AerAlertDialogProps) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <div className={className} {...rest}>
          <AlertDialog.Overlay className={styles.overlay} />
          <AlertDialog.Content className={cx(styles.content)}>
            {elementIsHideableTextShape(dialogTitle) ? (
              <AlertDialog.Title
                className={cx(styles.title, {
                  [styles.visuallyHidden]: dialogTitle.hide,
                })}
              >
                {dialogTitle.text}
              </AlertDialog.Title>
            ) : (
              <AlertDialog.Title className={cx(styles.title)}>
                {dialogTitle}
              </AlertDialog.Title>
            )}
            <AlertDialog.Description className={styles.description} asChild>
              {children}
            </AlertDialog.Description>
            {footer ? (
              footer
            ) : (
              <AerAlertDialogFooter cancel={<AerButton>Close</AerButton>} />
            )}
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
