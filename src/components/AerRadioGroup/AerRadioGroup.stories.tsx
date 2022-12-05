import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerRadioGroup } from "./index";

const Meta: ComponentMeta<typeof AerRadioGroup.Root> = {
  title: "Components/AerRadioGroup",
  component: AerRadioGroup.Root,
  subcomponents: { Item: AerRadioGroup.Item },
};

export default Meta;

const Template: ComponentStory<typeof AerRadioGroup.Root> = (args) => (
  <AerRadioGroup.Root {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <AerRadioGroup.Item label="Testing" value="testing" checked />
      <AerRadioGroup.Item label="Writing docs" value="docs" />
      <AerRadioGroup.Item label="Code reviews" value="pr" />
      <AerRadioGroup.Item
        label="Writing new features"
        disabled={true}
        value="new"
      />
    </>
  ),
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerRadioGroup component implements the following local theme</p>
    <pre>
      {`
      animation-duration: var(--ease-duration-short, 150ms);
      `}
    </pre>
  </>
);
