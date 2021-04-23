import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";

export interface IFacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

export interface IFacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}
