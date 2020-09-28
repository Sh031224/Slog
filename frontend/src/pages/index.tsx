import React from "react";
import MainTemplate from "components/common/Template/MainTemplate";
import MainContainer from "containers/Main/MainContainer";
import axios from "axios";
import GetCookie from "lib/GetCookie";

interface IndexPageProps {
  token?: string;
}

class IndexPage extends React.Component<IndexPageProps> {
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
        <MainContainer />
      </MainTemplate>
    );
  }
}

export default IndexPage;
