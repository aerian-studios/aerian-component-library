import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AerButton } from "./AerButton";

const Meta: ComponentMeta<typeof AerButton> = {
  title: "Components/Button",
  component: AerButton,
};

export default Meta;

export const Default: ComponentStory<typeof AerButton> = () => (
  <>
    <AerButton>Example</AerButton>
    <AerButton disabled>Example (disabled)</AerButton>
  </>
);

export const LocalTheme: ComponentStory<any> = () => (
  <>
    <p>
      The AerButton component implements the following CSS variables that are
      available in the global scope
    </p>
    <pre>
      {`
      // Button
      --c-button: var(--c-cobalt);
      --c-button-bg: var(--c-white);
      --c-button-border: var(--c-cobalt);
      --c-button-hover: var(--c-luminous-vivid-amber);
      --c-button-hover-bg: var(--c-white);
      --c-button-hover-border: var(--c-luminous-vivid-amber);
      border-radius: var(--s-btn-radius, var(--s-border-radius-s));
      --c-button-disabled: var(--c-gray-600);
      --c-button-disabled-bg: var(--c-gray-200);
      // Primary
      --c-button-primary: var(--c-cobalt);
      --c-button-primary-bg: var(--c-vivid-green-cyan);
      --c-button-primary-border: var(--c-cobalt);
      --c-button-primary-hover: var(--c-cobalt);
      --c-button-primary-hover-bg: var(--c-luminous-vivid-amber);
      --c-button-primary-hover-border: var(--c-cobalt);
      --c-button-primary-disabled: var(--c-gray-600);
      --c-button-primary-disabled-bg: var(--c-gray-200);
      // Important/negative
      --c-button-important: var(--c-white);
      --c-button-important-bg: var(--c-negative);
      --c-button-important-border: var(--c-negative);
      --c-button-important-hover: var(--c-cobalt);
      --c-button-important-hover-bg: var(--c-luminous-vivid-amber);
      --c-button-important-hover-border: var(--c-cobalt);
      --c-button-important-disabled: var(--c-gray-600);
      --c-button-important-disabled-bg: var(--c-gray-200);
      // (buttons that look like links)
      --c-button-tertiary: var(--c-link);
      --c-button-tertiary-bg: transparent;
      --c-button-tertiary-border: transparent;
      --c-button-tertiary-hover: var(--c-link-hover);
      --c-button-tertiary-hover-border: transparent;
      --c-button-tertiary-hover-bg: transparent;
      --c-button-tertiary-disabled: var(--c-link-disabled);
      --c-button-tertiary-disabled-bg: transparent;
      `}
    </pre>
  </>
);

export const PrimaryVariant: ComponentStory<typeof AerButton> = () => (
  <>
    <AerButton variant={"primary"}>Example</AerButton>
    <AerButton variant={"primary"} disabled>
      Example (disabled)
    </AerButton>
  </>
);
PrimaryVariant.parameters = {
  docs: {
    description: {
      story: "This variant is used for the main (primary) action.",
    },
  },
};

export const TertiaryVariant: ComponentStory<typeof AerButton> = () => (
  <>
    <AerButton variant={"tertiary"}>Example</AerButton>
    <AerButton variant={"tertiary"} disabled>
      Example (disabled)
    </AerButton>
  </>
);
TertiaryVariant.parameters = {
  docs: {
    description: {
      story:
        "This variant is used where the button should not stand out, or if it should look like a link but it does not navigate.",
    },
  },
};

export const ImportantVariant: ComponentStory<typeof AerButton> = () => (
  <>
    <AerButton variant={"important"}>Example</AerButton>
    <AerButton variant={"important"} disabled>
      Example (disabled)
    </AerButton>
  </>
);
ImportantVariant.parameters = {
  docs: {
    description: {
      story:
        "This variant is for important potentially destructive operations.",
    },
  },
};
