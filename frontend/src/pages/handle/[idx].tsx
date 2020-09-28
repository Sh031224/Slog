import MainTemplate from "components/common/Template/MainTemplate";
import HandleContainer from "containers/Handle/HandleContainer";
import GetCookie from "lib/GetCookie";
import React from "react";

interface HandleProps {
  token?: string;
}

class Handle extends React.Component<HandleProps> {
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
        <HandleContainer />
      </MainTemplate>
    );
  }
}

export default Handle;
