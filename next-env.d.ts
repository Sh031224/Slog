/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "react-facebook-login/dist/facebook-login-render-props";
declare module "react-notifications";
declare module "*.png" {
  const value: any;
  export default value;
}
declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
