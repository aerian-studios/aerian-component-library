import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
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

const Meta: ComponentMeta<typeof AerDropdownMenu> = {
  title: "Components/AerDropdownMenu",
  component: AerDropdownMenu,
  subcomponents: {
    AerMenuItem,
    AerCheckboxMenuItem,
    AerMenuRadioGroup,
    AerMenuSeparator,
    AerMenuSectionHeading,
    AerMenuItemWithSubDropdown,
  },
};

export default Meta;

export const Default: ComponentStory<typeof AerDropdownMenu> = (args) => (
  <AerDropdownMenu {...args}>
    <AerMenuItem>This is a menu item</AerMenuItem>
    <AerMenuItem>This too</AerMenuItem>
    <AerCheckboxMenuItem checked>Checkbox menu item</AerCheckboxMenuItem>
    <AerMenuSeparator />
    <AerMenuSectionHeading>Some related content</AerMenuSectionHeading>
    <AerMenuRadioGroup
      value="3"
      radioItems={[
        { value: "1", content: "First radio" },
        { value: "2", content: "Second radio", disabled: true },
        { value: "3", content: "Third radio" },
        { value: "4", content: "Fourth radio" },
      ]}
    />
    <AerMenuItemWithSubDropdown
      subMenuParentContent={
        <>
          Menu item & sub-menu{" "}
          <div>
            <ChevronRightIcon />
          </div>
        </>
      }
    >
      <AerMenuItem>This is a menu item</AerMenuItem>
      <AerMenuItem>This too</AerMenuItem>
      <AerMenuItem>This is a menu item</AerMenuItem>
      <AerMenuItem>This too</AerMenuItem>
    </AerMenuItemWithSubDropdown>
  </AerDropdownMenu>
);

Default.args = {
  defaultOpen: true,
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerDropdownMenu component implements the following local theme</p>
    <pre>
      {`
      content: background-color: var(--c-cmp-dropmenu-bg, var(--c-white));
      content: border-radius: var(--s-cmp-dropmenu-border-radius, var(--s-border-radius-xs));
      content: padding: var(--s-cmp-padding, calc(var(--s-1)0.5));
      content: box-shadow: var(--sh-box-l);
      content: animation-duration: var(--ease-cmp-duration, 400ms);

      menuitem: font-size: var(--t-cmp-item, var(--t-body-sm));
      menuitem: color: var(--c-cmp-dropmenu-item, var(--c-body));
      menuitem: border-radius: var(--s-cmp-dropmenu-item-border-radius, var(--s-border-radius-xs));
      menuitem: padding: var(--s-cmp-item-padding, 0 calc(var(--s-1)0.5) 0 var(--s-3));
      menuitem: var(--s-cmp-dropmenu-item-height, var(--s-3));
      menuitem: color: var(--c-cmp-dropmenu-item-highlight, var(--c-white));
      menuitem: background-color: var(--c-cmp-dropmenu-item-highlight-bg, var(--c-gray-600));

      submenuparent: [data-state="open"]: background-color: var(--c-cmp-dropmenu-item-open-bg, var(--c-gray-200));
      submenuparent: [data-state="open"]: color: var(--c-cmp-dropmenu-item-open, var(--c-gray-800));

      heading: padding: var(--s-cmp-item-heading-padding, 0 0 0 var(--s-3));
      heading:font-size: var(--t-cmp-item-heading, var(--t-heading-xxs));
      heading:line-height: var(--lh-cmp-item-heading-padding, (--s-3));
      heading: color: var(--c-cmp-item-heading, var(--c-gray-600));

      iconbutton: height: var(--s-5);
      iconbutton: width: var(--s-5);
      iconbutton: color: var(--c-cmp-menubutton, var(--c-body));
      iconbutton: background-color: var(--c-cmp-menubutton-bg, transparent);
      iconbutton: box-shadow: var(--sh-cmp-menubutton, var(--sh-box-xs));
      iconbutton:hover: background-color: var(--c-cmp-menubutton-hover-bg, var(--c-gray-200));
      iconbutton: focus: box-shadow: 0 0 0 2px var(--c-focus);
      `}
    </pre>
  </>
);

const Template: ComponentStory<typeof AerDropdownMenu> = (args) => (
  <AerDropdownMenu {...args}>
    <AerMenuItem>This is a menu item</AerMenuItem>
    <AerMenuItem>This too</AerMenuItem>
    <AerMenuItem>This is a menu item</AerMenuItem>
    <AerMenuItem>This too</AerMenuItem>
    <AerMenuItem>This is a menu item</AerMenuItem>
    <AerMenuItem>This too</AerMenuItem>
  </AerDropdownMenu>
);
export const WithArrow = Template.bind({});
WithArrow.args = {
  includeArrow: true,
};
WithArrow.parameters = {
  docs: {
    storyDescription: "Include an arrow indicator on the dropdown",
  },
};

export const CustomSide = Template.bind({});
CustomSide.args = {
  side: "right",
  includeArrow: true,
};
CustomSide.parameters = {
  docs: {
    storyDescription: "Include an arrow indicator on the dropdown",
  },
};
