import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y"; // <- or your view layer
import { withKnobs } from "@storybook/addon-knobs";

addDecorator(withA11y);
addDecorator(withKnobs);
