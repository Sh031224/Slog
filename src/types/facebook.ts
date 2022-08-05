import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from "react-facebook-login";

export interface FacebookLoginInfo extends ReactFacebookLoginInfo {
  accessToken: string;
}

export interface FacebookFailureResponse extends ReactFacebookFailureResponse {
  accessToken?: string;
}
