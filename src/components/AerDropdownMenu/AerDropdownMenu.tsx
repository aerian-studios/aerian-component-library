import React, { forwardRef, ReactElement, useRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotFilledIcon, CheckIcon } from "@radix-ui/react-icons";

import cx from "classnames";
import styles from "./AerDropdownMenu.module.scss";
import { DefaultProps } from "../../types/types";
import { removeEmptyObjectKVs } from "../../utils/dataStructures";

const dialogContainer = document.getElementById("dialog-container");

if (!dialogContainer) {
  const dialogContainer = document.createElement("div");
  dialogContainer.id = "dialog-container";

  document.body.appendChild(dialogContainer);
}

/**
 * AerMenuItem is used for normal menu items. It implements [the same API as the Radix component](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#item)
 */
export const AerMenuItem = forwardRef(
  (
    {
      className,
      ...rest
    }: DropdownMenu.DropdownMenuItemProps & React.RefAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.DropdownMenuItem
        className={cx(styles.menuItem, className)}
        ref={ref}
        {...rest}
      />
    );
  }
);
/**
 * AerCheckboxMenuItem is used for menu items that contain checkboxes. It implements [the same API as the Radix component](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#checkboxitem)
 */
export const AerCheckboxMenuItem = forwardRef(
  (
    {
      className,
      children,
      checkIcon,
      ...rest
    }: DropdownMenu.DropdownMenuCheckboxItemProps &
      React.RefAttributes<HTMLDivElement> & { checkIcon?: ReactElement },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.DropdownMenuCheckboxItem
        className={cx(styles.menuCheckboxItem, className)}
        ref={ref}
        {...rest}
      >
        <DropdownMenu.ItemIndicator className={styles.menuItemIndicator}>
          {checkIcon ? checkIcon : <CheckIcon />}
        </DropdownMenu.ItemIndicator>
        {children}
      </DropdownMenu.DropdownMenuCheckboxItem>
    );
  }
);

export type RadioGroupItem = {
  className?: string;
  disabled?: boolean;
  /** Unique value of the item */
  value: string;
  /** The visible text content of the item */
  content: string | ReactElement;
  /** A function to call when this specific radio item is checked (as well as the AerRadioGroup's `onValueChange` function) */
  onSelect?: (event: Event) => void;
  /** Custom indicator for the radio item. This defaults to a round bullet */
  indicator?: ReactElement;
};
export type DropdownMenuRadioGroupItems = { radioItems: RadioGroupItem[] };
/**
 * AerMenuRadioGroup is used for a group of menu items that can only have one item selected. It implements [the API of this Radix component](https://www.radix-ui.com/docs/primitives/components/dropdown-menu#radiogroup) and a little more for managing the contents
 */
export const AerMenuRadioGroup = forwardRef(
  (
    {
      className,
      radioItems,
      ...rest
    }: DropdownMenu.DropdownMenuRadioGroupProps &
      React.RefAttributes<HTMLDivElement> &
      DropdownMenuRadioGroupItems,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.RadioGroup className={cx(className)} ref={ref} {...rest}>
        {radioItems.map((item) => {
          return (
            <DropdownMenu.RadioItem
              value={item.value}
              className={cx(styles.menuRadioItem, item.className)}
              disabled={item.disabled}
              onSelect={item.onSelect}
              key={`radio-${item.value}`}
            >
              <DropdownMenu.ItemIndicator className={styles.menuItemIndicator}>
                {item.indicator ? item.indicator : <DotFilledIcon />}
              </DropdownMenu.ItemIndicator>
              {item.content}
            </DropdownMenu.RadioItem>
          );
        })}
      </DropdownMenu.RadioGroup>
    );
  }
);

export const AerMenuSeparator = forwardRef(
  (
    {
      className,
      ...rest
    }: DropdownMenu.DropdownMenuSeparatorProps &
      React.RefAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.DropdownMenuSeparator
        className={cx(styles.separator, className)}
        {...rest}
      />
    );
  }
);

export const AerMenuSectionHeading = forwardRef(
  (
    {
      className,
      children,
      ...rest
    }: DropdownMenu.DropdownMenuLabelProps &
      React.RefAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.DropdownMenuLabel
        className={cx(styles.menuLabel, className)}
        {...rest}
      >
        {children}
      </DropdownMenu.DropdownMenuLabel>
    );
  }
);

export type AerSubDropdown = {
  // Custom style to add to submenu parent
  className?: string;
  // The content for the parent. Please include an indicator that there is a dropdown
  subMenuParentContent: ReactElement;
};

export const AerMenuItemWithSubDropdown = forwardRef(
  (
    {
      className,
      subMenuParentContent,
      children,
      ...rest
    }: DropdownMenu.DropdownMenuSubProps &
      React.RefAttributes<HTMLDivElement> &
      AerSubDropdown,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <DropdownMenu.Sub {...rest}>
        <DropdownMenu.SubTrigger className={cx(styles.subTrigger, className)}>
          {subMenuParentContent}
        </DropdownMenu.SubTrigger>
        <DropdownMenu.Portal>
          <DropdownMenu.SubContent
            className={styles.subContent}
            sideOffset={2}
            alignOffset={-4}
          >
            {children}
          </DropdownMenu.SubContent>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
    );
  }
);

export interface AerDropdownMenuProps
  extends DropdownMenu.DropdownMenuProps,
    DropdownMenu.DropdownMenuContentProps,
    Omit<DefaultProps<"div">, "dir"> {
  children: React.ReactNode;
  /** A button to trigger the opening of the dropdown. *Please ensure the button has accessible text* */
  trigger: ReactElement;
  /** Include an arrow on the dropdown panel */
  includeArrow?: boolean;
}

/**
 * AerDropdownMenu provides a flexible menu dropdown that can have submenus, checkbox and radio menu items. *NOTE:* This is `modal` by default.
 */
export const AerDropdownMenu = forwardRef(
  (
    {
      className,
      trigger,
      children,
      includeArrow,
      ...rest
    }: AerDropdownMenuProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const { defaultOpen, open, onOpenChange, modal, dir, ...otherProps } = rest;
    const rootProps = removeEmptyObjectKVs({
      defaultOpen,
      open,
      onOpenChange,
      modal,
      dir,
    });

    const dialogContainer = useRef(document.getElementById("dialog-container"));
    // to prevent the dropdown littering the body, this is created before render
    if (!dialogContainer.current) {
      dialogContainer.current = document.createElement("div");
      dialogContainer.current.id = "dialog-container";

      document.body.appendChild(dialogContainer.current);
    }

    return (
      <DropdownMenu.Root {...rootProps}>
        <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>

        <DropdownMenu.Portal container={dialogContainer.current}>
          <DropdownMenu.Content
            className={cx(styles.menuContent, className)}
            {...otherProps}
            ref={ref}
            sideOffset={4}
          >
            {children}
            {includeArrow && (
              <DropdownMenu.Arrow className={styles.menuArrow} />
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);
