import MainTemplate from "components/common/Template/MainTemplate";
import PrivacyContainer from "containers/Privacy/PrivacyContainer";
import GetCookie from "lib/GetCookie";
import React from "react";

interface PrivacyProps {
  token?: string;
}

class Privacy extends React.Component<PrivacyProps> {
  static async getInitialProps(ctx: any) {
    const isServer = typeof window === "undefined";

    if (isServer && ctx.req.headers.cookie) {
      const token = await GetCookie(ctx);

      return { token };
    }

    return { token: "" };
  }

  render() {
    const { token } = this.props;

    return (
      <MainTemplate token={token}>
        <PrivacyContainer />
      </MainTemplate>
    );
  }
}

export default Privacy;
