import React from "react";
import { createRoot } from "react-dom/client";
import {
  AerAlertDialog,
  AerAlertDialogFooter,
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
    <AerAlertDialog.Root
      className={styles.dialog}
      trigger={<AerButton>Open the dialog</AerButton>}
      dialogTitle={"This is important!"}
      footer={
        <AerAlertDialogFooter
          className={styles.footer}
          cancel={<AerButton variant="important">Cancel</AerButton>}
          action={<AerButton variant="primary">Yes, do it!</AerButton>}
        />
      }
    >
      <p>Are you sure about all of that stuff?</p>
    </AerAlertDialog.Root>
  </React.StrictMode>
);
