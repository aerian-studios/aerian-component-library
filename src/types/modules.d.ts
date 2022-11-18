declare module "*.scss" {
  const content: Record<string, string>;
  export = content;
}

declare module "*.module.scss" {
  const content: Record<string, string>;
  export = content;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}