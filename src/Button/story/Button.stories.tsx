import React from "react";
import { Button } from "../";

export default {
  title: "Button",
};

export const primary = () => (
  <Button onClick={() => {}} disabled={false} variant="primary">
    Primary
  </Button>
);

export const secondary = () => (
  <Button onClick={() => {}} disabled={false} variant="secondary">
    Secondary
  </Button>
);
