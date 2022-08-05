import "redux";

declare module "redux" {
  export interface Dispatch {
    (...args: any[]): any;
  }
}
