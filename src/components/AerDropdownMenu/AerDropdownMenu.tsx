import React, {
  Children,
  forwardRef,
  ReactElement,
  useLayoutEffect,
} from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  HamburgerMenuIcon,
  DotFilledIcon,
  CheckIcon,
  ChevronRightIcon,
} from "@radix-ui/react-icons";

import cx from "classnames";
import styles from "./AerDropdownMenu.module.scss";
import { DefaultProps } from "../../types/types";
import { CheckedStates } from "../AerCheckbox/AerCheckbox";
import { useMemo } from "@storybook/addons";

/*
<button className="IconButton" aria-label="Customise options">
            <HamburgerMenuIcon />
          </button>*/

export type MenuItemTypes =
  | "item"
  | "itemWithSubmenu"
  | "itemWithCheckbox"
  | "label"
  | "groupOfRadioItems"
  | "separator";

export type SeparatorMenuItem = { type: "separator" };
export type MenuLabel = {
  type: "label";
  label: string | ReactElement;
};

export type MenuItem = MenuLabel & {
  type: "item";
  actionCb?: React.EventHandler<React.MouseEvent>;
};

export type MenuItemWithCheckbox = MenuItem & {
  type: "itemWithCheckbox";
  defaultChecked?: CheckedStates;
  value?: string;
  disabled?: boolean;
};

export type RadioGroupMenuItem = MenuItemWithCheckbox[];
export type MenuContent = Record<
  MenuItemTypes,
  | MenuLabel
  | MenuItem
  | MenuItemWithCheckbox
  | RadioGroupMenuItem
  | SeparatorMenuItem
>;
export interface AerDropdownMenuProps
  extends DropdownMenu.DropdownMenuProps,
    DropdownMenu.DropdownMenuContentProps,
    Omit<DefaultProps<"div">, "dir"> {
  // A button to trigger the opening of the dropdown
  trigger: ReactElement;
  menuContent: MenuContent[];
}
/**
 * IMPORTANT: Add a description to document this component for storybooks
 */
export const AerDropdownMenu = forwardRef(
  (
    { className, menuContent, trigger, ...rest }: AerDropdownMenuProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const dialogContainer = document.getElementById("dialog-container");

    const { defaultOpen, open, onOpenChange, modal, dir, ...otherProps } = rest;

    const memoisedMenuContent = useMemo(() => {
      const ret = [];
      // todo
      return ret;
    }, []);

    useLayoutEffect(() => {
      if (!dialogContainer) {
        const dialogContainer = document.createElement("div");
        dialogContainer.id = "dialog-container";

        document.body.appendChild(dialogContainer);
      }
    }, []);

    return (
      <DropdownMenu.Root
        defaultOpen={defaultOpen}
        open={open}
        onOpenChange={onOpenChange}
        modal={modal}
        dir={dir}
      >
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

        <DropdownMenu.Portal container={dialogContainer}>
          <DropdownMenu.Content
            className={cx(styles.dropdownMenuContent, className)}
            {...otherProps}
            ref={ref}
          >
            {memoisedMenuContent}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);
