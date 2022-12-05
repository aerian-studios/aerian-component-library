import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import { render, cleanup, screen, findAllByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AerCheckboxMenuItem,
  AerDropdownMenu,
  AerMenuItem,
  AerMenuItemWithSubDropdown,
  AerMenuRadioGroup,
  AerMenuSectionHeading,
  AerMenuSeparator,
} from "./index";
import { ChevronRightIcon } from "@radix-ui/react-icons";

describe("AerDropdownMenu", () => {
  afterEach(() => {
    cleanup();
  });

  // todo The test fails on `Error: Uncaught [ReferenceError: ResizeObserver is not defined]`, which seems like an issue with radix perhaps
  it.skip("should render correctly", async () => {
    const { baseElement } = render(
      <AerDropdownMenu open={true}>
        <AerMenuItem>This is a menu item</AerMenuItem>
        <AerMenuItem>This too</AerMenuItem>
        <AerCheckboxMenuItem checked>Checkbox menu item</AerCheckboxMenuItem>
      </AerDropdownMenu>
    );

    const menuButton = screen.getByRole("button", {
      name: "Customise options",
    });
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");

    const menuItems = await screen.findAllByRole("menuitem");

    expect(menuItems.length).toBe(3);
    expect(baseElement).toMatchSnapshot();
  });
});
