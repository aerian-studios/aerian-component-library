import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerCheckbox } from "./index";

const Meta: ComponentMeta<typeof AerCheckbox> = {
  title: "Components/AerCheckbox",
  component: AerCheckbox,
};

export default Meta;

const Template: ComponentStory<typeof AerCheckbox> = (args) => (
  <AerCheckbox {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Accept the terms and conditions",
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerCheckbox component implements the following local theme</p>
    <pre>
      {`
      animation-duration: var(--ease-duration-short, 150ms);
      `}
    </pre>
  </>
);

export const Checked = Template.bind({});
Checked.args = {
  label: "Accept the terms and conditions",
  defaultState: true,
};
Checked.parameters = {
  docs: {
    storyDescription:
      "This is the dark variant of the component and it displays...",
  },
};

export const Indeterminate = Template.bind({});
Indeterminate.args = {
  label: "Accept the terms and conditions",
  defaultState: "indeterminate",
};
Indeterminate.parameters = {
  docs: {
    storyDescription:
      "Indeterminate is only settable (and unsettable) via the `checked` prop; local state changes will not affect it",
  },
};

export const Invalid = Template.bind({});
Invalid.args = {
  label: "Accept the terms and conditions",
  defaultState: true,
  required: true,
};
Invalid.parameters = {
  docs: {
    storyDescription:
      "Invalid elements will show an error message. To trigger the error on this required field, deselect the checkbox and tab or click outside",
  },
};

export const CustomCheckIcons = Template.bind({});
CustomCheckIcons.args = {
  label: "Accept the terms and conditions",
  defaultState: false,
  checkBox: <span style={{ border: "2px solid green" }}></span>,
  checkedIcon: (
    <span style={{ display: "flex", justifyContent: "center" }}>💝</span>
  ),
};
CustomCheckIcons.parameters = {
  docs: {
    storyDescription:
      "CustomCheckIcons give you complete control over the look of the check box UI. The `checkBox` relates to the background; the `checkedIcon` relates to the icon to show when checked; and the `indeterminateIcon`, what to show when indeterminate",
  },
};

export const CustomInvalidMessage = Template.bind({});
CustomInvalidMessage.args = {
  label: "Accept the terms and conditions",
  defaultState: false,
  required: true,
  errorMessage: "Beep Boop! Please fill in this field.",
};
CustomInvalidMessage.parameters = {
  docs: {
    storyDescription:
      "It is possible to override the validity by providing a custom `errorMessage` prop. NOTE: The component will remain invalid until the `errorMessage` prop is `falsy`",
  },
};
