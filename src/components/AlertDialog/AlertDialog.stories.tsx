import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AlertDialog, AlertDialogTrigger, AlertDialogFooter } from "./index";

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
      <button>Open the dialog</button>
    </AlertDialogTrigger>
  ),
  dialogTitle: <>This is important!</>,
  dialogContent: <p>Are you sure about all of that stuff?</p>,
  dialogFooter: (
    <AlertDialogFooter
      dialogCancel={<button>Cancel</button>}
      dialogAction={<button>Yes, do it!</button>}
    />
  ),
};
