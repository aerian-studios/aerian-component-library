import React from "react";
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
      trigger={<AerButton>Open the dialog</AerButton>}
      title={"This is important!"}
      footer={
        <AerAlertDialogFooter
          className={styles.footer}
          cancel={<AerButton variant="important">Cancel</AerButton>}
          action={<AerButton variant="primary">Yes, do it!</AerButton>}
        />
      }
      content={<p>Are you sure about all of that stuff?</p>}
    />
  </React.StrictMode>
);
