import React, { ReactElement } from "react";
import cx from "classnames";
import * as Dialog from "@radix-ui/react-alert-dialog";
import styles from "./AlertDialog.module.scss";
import { DefaultProps } from "../../types/types";

export const AlertDialogTrigger = ({ children }: DefaultProps<"button">) => (
  <Dialog.Trigger asChild>{children}</Dialog.Trigger>
);

export interface AlertDialogFooterProps extends DefaultProps<"footer"> {
  // An element (ideally a button) to cancel the alert dialog
  dialogCancel?: ReactElement;
  // An element (ideally a button) to trigger the alert dialog action
  dialogAction: ReactElement;
}

export const AlertDialogFooter = ({
  dialogCancel,
  dialogAction,
  ...rest
}: AlertDialogFooterProps) => (
  <footer {...rest}>
    {dialogCancel ? (
      <Dialog.Cancel asChild>{dialogCancel}</Dialog.Cancel>
    ) : null}
    <Dialog.Action asChild>{dialogAction}</Dialog.Action>
  </footer>
);

const elementIsReactElement = (element: any): element is ReactElement => {
  return "props" in element;
};

export interface AlertDialogProps extends DefaultProps<"div"> {
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
export const AlertDialog = ({
  className,
  trigger,
  dialogTitle,
  dialogFooter,
  dialogContent,
}: AlertDialogProps) => {
  return (
    <Dialog.Root>
      {trigger}
      <Dialog.Portal>
        <div className={className}>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={cx(styles.content)}>
            {elementIsReactElement(dialogTitle) ? (
              <Dialog.Title className={cx(styles.title)}>
                {dialogTitle}
              </Dialog.Title>
            ) : (
              <Dialog.Title
                className={cx(styles.title, {
                  [styles.visuallyHidden]: dialogTitle.hideTitle === false,
                })}
              >
                {dialogTitle.title}
              </Dialog.Title>
            )}
            <Dialog.Description className={styles.description} asChild>
              {dialogContent}
            </Dialog.Description>
            {dialogFooter}
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
