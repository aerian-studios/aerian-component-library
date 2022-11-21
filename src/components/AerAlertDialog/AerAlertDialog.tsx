import React, { ReactElement } from "react";
import cx from "classnames";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./AlertDialog.module.scss";
import { DefaultProps } from "../../types/types";

export const AerAlertDialogTrigger = ({ children }: DefaultProps<"button">) => (
  <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
);

export interface AlertDialogFooterProps extends DefaultProps<"footer"> {
  // An element (ideally a button) to cancel the alert dialog
  dialogCancel?: ReactElement;
  // An element (ideally a button) to trigger the alert dialog action
  dialogAction: ReactElement;
}

export const AerAlertDialogFooter = ({
  dialogCancel,
  dialogAction,
  ...rest
}: AlertDialogFooterProps) => (
  <footer {...rest}>
    {dialogCancel ? (
      <AlertDialog.Cancel asChild>{dialogCancel}</AlertDialog.Cancel>
    ) : null}
    <AlertDialog.Action asChild>{dialogAction}</AlertDialog.Action>
  </footer>
);

const elementIsReactElement = (element: any): element is ReactElement => {
  return "props" in element;
};

export interface AerAlertDialogProps extends DefaultProps<"div"> {
  // The trigger should be an `AlertDialogTrigger`
  trigger: ReactElement;
  // `dialogTitle` is an object of the title and whether to hide the title (this defaults to true). NOTE: This is placed in an `<h2>`.
  dialogTitle: ReactElement | { title: ReactElement; hideTitle?: boolean };
  // The body content of the alert. NOTE: This will take the form of the element that you pass in.
  dialogContent: ReactElement;
  // An element that displays in the dialog footer that contains an action and an optional cancel button
  dialogFooter: ReactElement;
}
/**
 * The AlertDialog interrupts a user's workflow to communicate an important message that requires a response. *NOTE:* This is different from the Dialog component
 */
export const AerAlertDialog = ({
  className,
  trigger,
  dialogTitle,
  dialogFooter,
  dialogContent,
}: AerAlertDialogProps) => {
  return (
    <AlertDialog.Root>
      {trigger}
      <AlertDialog.Portal>
        <div className={className}>
          <AlertDialog.Overlay className={styles.overlay} />
          <AlertDialog.Content className={cx(styles.content)}>
            {elementIsReactElement(dialogTitle) ? (
              <AlertDialog.Title className={cx(styles.title)}>
                {dialogTitle}
              </AlertDialog.Title>
            ) : (
              <AlertDialog.Title
                className={cx(styles.title, {
                  [styles.visuallyHidden]: dialogTitle.hideTitle === false,
                })}
              >
                {dialogTitle.title}
              </AlertDialog.Title>
            )}
            <AlertDialog.Description className={styles.description} asChild>
              {dialogContent}
            </AlertDialog.Description>
            {dialogFooter}
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
