import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AlertDialog, AlertDialogTrigger, AlertDialogFooter } from "./index";
import { Button } from "../Button";

const Meta: ComponentMeta<typeof AlertDialog> = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  subcomponents: { AlertDialogTrigger, AlertDialogFooter },
};

export default Meta;

const Template: ComponentStory<typeof AlertDialog> = (args) => (
  <AlertDialog {...args} />
);
export const Default = Template.bind({});

Default.args = {
  trigger: (
    <AlertDialogTrigger>
      <Button variant="tertiary">Open the dialog</Button>
    </AlertDialogTrigger>
  ),
  dialogTitle: <>This is important!</>,
  dialogContent: <p>Are you sure about all of that stuff?</p>,
  dialogFooter: (
    <AlertDialogFooter
      style={{ justifyContent: "space-between", display: "flex" }}
      dialogCancel={<Button variant="important">Cancel</Button>}
      dialogAction={<Button variant="primary">Yes, do it!</Button>}
    />
  ),
};
