import React from "react";
// import "./theme.css";
import { createRoot } from "react-dom/client";
import {
  AerAlertDialog,
  AerAlertDialogFooter,
  AerAlertDialogTrigger,
} from "./components/AerAlertDialog";
import { AerButton } from "./components/AerButton";
import styles from "./main.module.scss";

const container = document.getElementById("root");

// Official docs suggest the non-null assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    {/* Test out some components here */}
    <AerAlertDialog
      className={styles.dialog}
      trigger={
        <AerAlertDialogTrigger>
          <AerButton>Open the dialog</AerButton>
        </AerAlertDialogTrigger>
      }
      dialogTitle={<>This is important!</>}
      dialogFooter={
        <AerAlertDialogFooter
          className={styles.footer}
          dialogCancel={<AerButton variant="important">Cancel</AerButton>}
          dialogAction={<AerButton variant="primary">Yes, do it!</AerButton>}
        />
      }
      dialogContent={<p>Are you sure about all of that stuff?</p>}
    />
  </React.StrictMode>
);
