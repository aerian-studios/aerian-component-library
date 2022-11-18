import React from "react";
// import "./theme.css";
import { createRoot } from "react-dom/client";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "./components/AlertDialog";
import { Button } from "./components/Button";
import styles from "./main.module.scss";

const container = document.getElementById("root");

// Official docs suggest the non-null assertion
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    {/* Test out some components here */}
    <AlertDialog
      className={styles.dialog}
      trigger={
        <AlertDialogTrigger>
          <Button>Open the dialog</Button>
        </AlertDialogTrigger>
      }
      dialogTitle={<>This is important!</>}
      dialogFooter={
        <AlertDialogFooter
          className={styles.footer}
          dialogCancel={<Button variant="important">Cancel</Button>}
          dialogAction={<Button variant="primary">Yes, do it!</Button>}
        />
      }
      dialogContent={<p>Are you sure about all of that stuff?</p>}
    />
  </React.StrictMode>
);
