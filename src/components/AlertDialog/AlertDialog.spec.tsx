import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AlertDialog, AlertDialogFooter, AlertDialogTrigger } from "./index";

describe("AlertDialog", () => {
  it("should render correctly", async () => {
    const { container } = render(
      <AlertDialog
        trigger={
          <AlertDialogTrigger>
            <button>Open the dialog</button>
          </AlertDialogTrigger>
        }
        dialogTitle={<>This is important!</>}
        dialogFooter={
          <AlertDialogFooter
            dialogCancel={<button>Cancel</button>}
            dialogAction={<button>Yes, do it!</button>}
          />
        }
        dialogContent={<p>Are you sure about all of that stuff?</p>}
      />
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open the dialog" })
    );

    expect(screen.getByRole("alertdialog", { name: "This is important!" }));
    expect(screen.getByText("Are you sure about all of that stuff?"));

    expect(container).toMatchSnapshot();
  });
});
