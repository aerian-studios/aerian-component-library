import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Button from "./Button";

const Meta: ComponentMeta<typeof Button> = {
  title: "Components/Inputs/Button",
  component: Button,
};

export default Meta;

export const Default: ComponentStory<typeof Button> = () => (
  <>
    <Button>Example</Button>
    <Button disabled>Example (disabled)</Button>
  </>
);

export const PrimaryVariant: ComponentStory<typeof Button> = () => (
  <>
    <Button variant={"primary"}>Example</Button>
    <Button variant={"primary"} disabled>
      Example (disabled)
    </Button>
  </>
);
PrimaryVariant.parameters = {
  docs: {
    storyDescription: "This variant is used for the main (primary) action.",
  },
};

export const TertiaryVariant: ComponentStory<typeof Button> = () => (
  <>
    <Button variant={"tertiary"}>Example</Button>
    <Button variant={"tertiary"} disabled>
      Example (disabled)
    </Button>
  </>
);
TertiaryVariant.parameters = {
  docs: {
    storyDescription:
      "This variant is used where the button should not stand out, or if it should look like a link but it does not navigate.",
  },
};

export const ImportantVariant: ComponentStory<typeof Button> = () => (
  <>
    <Button variant={"important"}>Example</Button>
    <Button variant={"important"} disabled>
      Example (disabled)
    </Button>
  </>
);
ImportantVariant.parameters = {
  docs: {
    storyDescription:
      "This variant is for important potentially destructive operations.",
  },
};
