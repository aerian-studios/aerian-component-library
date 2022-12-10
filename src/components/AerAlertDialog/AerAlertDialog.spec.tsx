import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerAlertDialog } from "./index";

describe("AlertDialog", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", async () => {
    const { baseElement } = render(
      <AerAlertDialog.Root
        trigger={<button>Open the dialog</button>}
        dialogTitle={<>This is important!</>}
        footer={
          <AerAlertDialog.Footer
            cancel={<button>Cancel</button>}
            action={<button>Yes, do it!</button>}
          />
        }
      >
        <p>Are you sure about all of that stuff?</p>
      </AerAlertDialog.Root>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open the dialog" })
    );

    expect(screen.getByRole("alertdialog", { name: "This is important!" }));
    expect(screen.getByText("Are you sure about all of that stuff?"));

    expect(baseElement).toMatchSnapshot();
  });

  it("should render an accessible `alertdialog` despite not showing the title visually", async () => {
    const { baseElement } = render(
      <AerAlertDialog.Root
        trigger={<button>Open the dialog</button>}
        dialogTitle={{ text: <>This is important!</>, hide: true }}
        footer={
          <AerAlertDialog.Footer
            cancel={<button>Cancel</button>}
            action={<button>Yes, do it!</button>}
          />
        }
      >
        <p>Are you sure about all of that stuff?</p>
      </AerAlertDialog.Root>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open the dialog" })
    );

    expect(screen.getByRole("alertdialog", { name: "This is important!" }));
    expect(baseElement).toMatchSnapshot();
  });

  it("should call the cancel callback and hide the dialog", async () => {
    const cancelCb = vi.fn();

    render(
      <AerAlertDialog.Root
        trigger={<button>Open the dialog</button>}
        dialogTitle={<>This is important!</>}
        footer={
          <AerAlertDialog.Footer
            cancel={<button onClick={cancelCb}>Cancel</button>}
            action={<button>Yes, do it!</button>}
          />
        }
      >
        <p>Are you sure about all of that stuff?</p>
      </AerAlertDialog.Root>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open the dialog" })
    );

    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(cancelCb).toHaveBeenCalledOnce();

    expect(
      screen.queryByRole("alertdialog", { name: "This is important!" })
    ).toBeNull();
  });

  it("should call the action callback and hide the dialog", async () => {
    const actionCb = vi.fn();

    render(
      <AerAlertDialog.Root
        trigger={<button>Open the dialog</button>}
        dialogTitle={"This is important!"}
        footer={
          <AerAlertDialog.Footer
            cancel={<button>Cancel</button>}
            action={<button onClick={actionCb}>Yes, do it!</button>}
          />
        }
      >
        <p>Are you sure about all of that stuff?</p>
      </AerAlertDialog.Root>
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Open the dialog" })
    );

    await userEvent.click(screen.getByRole("button", { name: /yes, do it/i }));

    expect(actionCb).toHaveBeenCalledOnce();
    expect(
      screen.queryByRole("alertdialog", { name: "This is important!" })
    ).toBeNull();
  });
});
