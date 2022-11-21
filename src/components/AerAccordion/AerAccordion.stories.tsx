import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerAccordion } from "./index";

const Meta: ComponentMeta<typeof AerAccordion> = {
    title: "Components/AerAccordion",
    component: AerAccordion,
};

export default Meta;

const Template: ComponentStory<typeof AerAccordion> = (args) => <AerAccordion {...args} />;

export const Default = Template.bind({});
Default.args = {
    key: "Milk Chocolate",
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>
      The AerAccordion component implements the following local theme
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
