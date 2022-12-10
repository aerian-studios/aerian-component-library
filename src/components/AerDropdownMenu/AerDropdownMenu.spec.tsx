import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen, findAllByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AerDropdownMenu } from "./index";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

describe("AerDropdownMenu", () => {
  afterEach(() => {
    cleanup();
  });

  // todo The test fails on `Error: Uncaught [ReferenceError: ResizeObserver is not defined]`, which seems like an issue with radix perhaps
  it.skip("should render correctly", async () => {
    const { baseElement } = render(
      <AerDropdownMenu.Root
        open={true}
        defaultOpen={true}
        trigger={
          <button aria-label="Options">
            <HamburgerMenuIcon />
          </button>
        }
      >
        <AerDropdownMenu.MenuItem>This is a menu item</AerDropdownMenu.MenuItem>
        <AerDropdownMenu.MenuItem>This too</AerDropdownMenu.MenuItem>
        <AerDropdownMenu.CheckboxMenuItem checked>
          Checkbox menu item
        </AerDropdownMenu.CheckboxMenuItem>
      </AerDropdownMenu.Root>
    );

    const menuButton = screen.getByRole("button", {
      name: "Options",
    });
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");

    const menuItems = await screen.findAllByRole("menuitem");

    expect(menuItems.length).toBe(3);
    expect(baseElement).toMatchSnapshot();
  });
});
