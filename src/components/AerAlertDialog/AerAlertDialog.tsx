import React, { ReactElement } from "react";
import cx from "classnames";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import styles from "./AerAlertDialog.module.scss";
import { DefaultProps } from "../../types/types";

export const AerAlertDialogTrigger = ({ children }: DefaultProps<"button">) => (
  <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
);

export interface AlertDialogFooterProps extends DefaultProps<"footer"> {
  // An element (ideally a button) to cancel the alert dialog
  cancel?: ReactElement;
  // An element (ideally a button) to trigger the alert dialog action
  action: ReactElement;
}

export const AerAlertDialogFooter = ({
  cancel,
  action,
  ...rest
}: AlertDialogFooterProps) => (
  <footer {...rest}>
    {cancel ? <AlertDialog.Cancel asChild>{cancel}</AlertDialog.Cancel> : null}
    <AlertDialog.Action asChild>{action}</AlertDialog.Action>
  </footer>
);

type TitleShape = {
  title: React.ReactElement | string;
  hideTitle: boolean;
};

const elementIsTitleShape = (element: any): element is TitleShape => {
  return (
    typeof element === "object" &&
    !Array.isArray(element) &&
    "hideTitle" in element
  );
};

export interface AerAlertDialogProps extends DefaultProps<"div"> {
  // The trigger should be an `AlertDialogTrigger`
  trigger: ReactElement;
  // `dialogTitle` is an object of the title and whether to hide the title (this defaults to true). NOTE: This is placed in an `<h2>`.
  title: ReactElement | TitleShape;
  // The body content of the alert. NOTE: This will take the form of the element that you pass in.
  content: ReactElement;
  // An element that displays in the dialog footer that contains an action and an optional cancel button
  footer: ReactElement;
}
/**
 * The AlertDialog interrupts a user's workflow to communicate an important message that requires a response. *NOTE:* This is different from the Dialog component
 */
export const AerAlertDialog = ({
  className,
  trigger,
  title,
  footer,
  content,
}: AerAlertDialogProps) => {
  console.log({ dialogTitle: title });

  return (
    <AlertDialog.Root>
      {trigger}
      <AlertDialog.Portal>
        <div className={className}>
          <AlertDialog.Overlay className={styles.overlay} />
          <AlertDialog.Content className={cx(styles.content)}>
            {!elementIsTitleShape(title) ? (
              <AlertDialog.Title className={cx(styles.title)}>
                {title}
              </AlertDialog.Title>
            ) : (
              <AlertDialog.Title
                className={cx(styles.title, {
                  [styles.visuallyHidden]: title.hideTitle,
                })}
              >
                {title.title}
              </AlertDialog.Title>
            )}
            <AlertDialog.Description className={styles.description} asChild>
              {content}
            </AlertDialog.Description>
            {footer}
          </AlertDialog.Content>
        </div>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
