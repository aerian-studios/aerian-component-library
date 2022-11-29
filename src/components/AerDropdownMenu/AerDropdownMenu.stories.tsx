import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerDropdownMenu } from "./index";

const Meta: ComponentMeta<typeof AerDropdownMenu> = {
    title: "Components/AerDropdownMenu",
    component: AerDropdownMenu,
};

export default Meta;

const Template: ComponentStory<typeof AerDropdownMenu> = (args) => <AerDropdownMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
    key: "Milk Chocolate",
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>
      The AerDropdownMenu component implements the following local theme
    </p>
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
