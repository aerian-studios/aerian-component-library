import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerAccordion } from "./index";
import {
  AerAccordionContent,
  AerAccordionHeader,
  AerAccordionItem,
} from "./AerAccordion";

const Meta: ComponentMeta<typeof AerAccordion> = {
  title: "Components/AerAccordion",
  component: AerAccordion,
  subcomponents: { AerAccordionHeader, AerAccordionContent, AerAccordionItem },
};

export default Meta;

const Template: ComponentStory<typeof AerAccordion> = (args) => (
  <AerAccordion {...args}>
    <AerAccordionItem value="item-1">
      <AerAccordionHeader>Header 1</AerAccordionHeader>
      <AerAccordionContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </AerAccordionContent>
    </AerAccordionItem>
    <AerAccordionItem value="item-2">
      <AerAccordionHeader>Header 2</AerAccordionHeader>
      <AerAccordionContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AerAccordionContent>
    </AerAccordionItem>
    <AerAccordionItem value="item-3">
      <AerAccordionHeader>Header 3</AerAccordionHeader>
      <AerAccordionContent>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </AerAccordionContent>
    </AerAccordionItem>
  </AerAccordion>
);

export const Default = Template.bind({});

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>The AerAccordion component implements the following local theme</p>
    <pre>
      {`
      root: border-radius: var(--s-cmp-border-radius, var(--s-border-radius-xs));
      root: width: var(--s-cmp-width, unset);
      root: box-shadow: var(--sh-cmp, var(--sh-box-xs));
     
      item-separator-color: var(--c-cmp-separator, var(--c-separator));// actually applied as a background to the root
      item-separator-height: var(--c-cmp-separator-height, 1px);
      item-focus-within-border-color: var(--c-cmp-focus, --c-focus);
      item-focus-within-border-size: var(--s-cmp-focus, 2px);
      
      item-header:trigger: padding: var(--s-cmp-trigger-padding-top, 0) var(--s-cmp-trigger-padding-right, var(--s-2)) var(--s-cmp-trigger-padding-bottom, 0) var(--s-cmp-trigger-padding-left, var(--s-2));
      item-header:trigger: height: var(--cmp-trigger-height, var(--t-heading-m));
      item-header:trigger: font-size: var(--t-cmp-trigger, var(--t-heading-m));
      item-header:trigger: color: var(--c-cmp-trigger);
      item-header:trigger: box-shadow: var(--sh-cmp-trigger, var(--sh-box-xs));
      item-header:trigger: background-color: var(--c-cmp-trigger-bg, var(--c-white));
      item-header:trigger:hover: color: var(--c-cmp-trigger-hover);
      item-header:trigger:hover: background-color: var(--c-cmp-trigger-bg-hover, var(--c-gray-100));
      item-header:trigger-icon: color: var(--c-cmp-trigger-icon, inherit);
      
      item-content: color: var(--c-cmp-item);
      item-content: font-size: var(--t-cmp-body, var(--t-body-m));
      item-content: background-color: var(--c-cmp-body-bg, var(--c-gray-100));
      item-content: padding: var(--s-cmp-body-padding-top, var(--s-1)) var(--s-cmp-body-padding-right, var(--s-2)) var(--s-cmp-body-padding-bottom, var(--s-1)) var(--s-cmp-body-padding-left, var(--s-2));
      `}
    </pre>
  </>
);
