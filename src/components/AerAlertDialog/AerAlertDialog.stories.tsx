import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerAlertDialog } from "./index";
import { AerButton } from "../AerButton";

const Meta: ComponentMeta<typeof AerAlertDialog.Root> = {
  title: "Components/AerAlertDialog",
  component: AerAlertDialog.Root,
  subcomponents: { "AerAlertDialog.Footer": AerAlertDialog.Footer },
};

export default Meta;

const Template: ComponentStory<typeof AerAlertDialog.Root> = (args) => (
  <AerAlertDialog.Root {...args} />
);
export const Default = Template.bind({});

Default.args = {
  trigger: <AerButton>Open the dialog</AerButton>,
  dialogTitle: "This is important!",
  children: <p>Are you sure about all of that stuff?</p>,
  footer: (
    <AerAlertDialog.Footer
      style={{ justifyContent: "space-between", display: "flex" }}
      cancel={<AerButton variant="important">Cancel</AerButton>}
      action={<AerButton variant="primary">Yes, do it!</AerButton>}
    />
  ),
};

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerAlertDialog component implements the following local theme:</p>
    <pre>
      {`
      
      * Implements the following theme:
      * animation-duration: var(--ease-duration-s, 150ms);
      * animation-transition:  var(--ease-1, 0.16, 1, 0.3, 1);
      * overlay animation: overlayShow
      * overlay: background-color: var(--c-overlay-bg-color);
      * overlay: opacity: var(--c-overlay-opacity);
      *
      * content animation: contentShow
      * content: background-color: var(--c-cmp-alertdialog-content-bg, var(--c-white));
      * content: border-radius: var(--s-border-radius-xs);
      * content: box-shadow: var(--sh-cmp-alertdialog-content-shadow, var(--sh-box-xs));
      * content: padding: var(--s-cmp-alertdialog-content-padding, var(--s-2));
      * content: var(--s-cmp-alertdialog-content-border-radius, var(--s-border-radius-xs));
      *
      * title: font-size: var(--t-cmp-alertdialog-title);
      * title: font-weight: var(--fw-cmp-alertdialog-title);
      
     `}
    </pre>
  </>
);

export const VisuallyHiddenTitle = Template.bind({});

VisuallyHiddenTitle.args = {
  trigger: <AerButton>Open the dialog</AerButton>,
  dialogTitle: { text: "This is important!", hide: true },
  children: <p>Are you sure about all of that stuff?</p>,
  footer: (
    <AerAlertDialog.Footer
      style={{ justifyContent: "space-between", display: "flex" }}
      cancel={<AerButton variant="important">Cancel</AerButton>}
      action={<AerButton variant="primary">Yes, do it!</AerButton>}
    />
  ),
};
