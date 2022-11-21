import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AerAlertDialog,
  AerAlertDialogTrigger,
  AerAlertDialogFooter,
} from "./index";
import { AerButton } from "../AerButton";

const Meta: ComponentMeta<typeof AerAlertDialog> = {
  title: "Components/AerAlertDialog",
  component: AerAlertDialog,
  subcomponents: { AerAlertDialogTrigger, AerAlertDialogFooter },
};

export default Meta;

const Template: ComponentStory<typeof AerAlertDialog> = (args) => (
  <AerAlertDialog {...args} />
);
export const Default = Template.bind({});

Default.args = {
  trigger: (
    <AerAlertDialogTrigger>
      <AerButton>Open the dialog</AerButton>
    </AerAlertDialogTrigger>
  ),
  dialogTitle: <>This is important!</>,
  dialogContent: <p>Are you sure about all of that stuff?</p>,
  dialogFooter: (
    <AerAlertDialogFooter
      style={{ justifyContent: "space-between", display: "flex" }}
      dialogCancel={<AerButton variant="important">Cancel</AerButton>}
      dialogAction={<AerButton variant="primary">Yes, do it!</AerButton>}
    />
  ),
};
