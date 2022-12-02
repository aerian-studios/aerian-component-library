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
import { AerAccordionHeader } from "../AerAccordion/AerAccordion";

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

const Template: ComponentStory<typeof AerDropdownMenu> = (args) => (
  <AerDropdownMenu {...args}>
    <AerMenuItem>This is a menu item</AerMenuItem>
    <AerCheckboxMenuItem checked>Checkbox menu item</AerCheckboxMenuItem>
    <AerMenuSeparator />
    <AerAccordionHeader>Some related content</AerAccordionHeader>
    <AerMenuRadioGroup
      value="third"
      radioItems={[
        { value: "1", content: "First radio", disabled: true },
        { value: "2", content: "Second radio", disabled: true },
        { value: "3", content: "Third radio" },
        { value: "4", content: "Fourth radio" },
      ]}
    />
  </AerDropdownMenu>
);

export const Default = Template.bind({});
Default.args = {};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerDropdownMenu component implements the following local theme</p>
    <pre>
      {`
      animation-duration: var(--ease-duration-short, 150ms);
      `}
    </pre>
  </>
);

export const DarkVariant = Template.bind({});
DarkVariant.args = {
  color: "dark",
  key: "Dark Chocolate",
};
DarkVariant.parameters = {
  docs: {
    storyDescription:
      "This is the dark variant of the component and it displays...",
  },
};
