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
      const cookies = await GetCookie(ctx);

      const token = cookies.filter((val: string) => {
        return val !== "";
      });

      return { token: token.toString() };
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
