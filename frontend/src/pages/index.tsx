import React from "react";
import GetCookie from "lib/GetCookie";
import { DocumentContext } from "next/document";
import dynamic from "next/dynamic";
import MainTemplate from "components/common/Template/MainTemplate";

const MainContainer = dynamic(() => import("containers/Main/MainContainer"));

interface IndexPageProps {
  token?: string;
}

class IndexPage extends React.Component<IndexPageProps> {
  static async getInitialProps(ctx: DocumentContext) {
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
    return (
      <MainTemplate token={this.props.token}>
        <MainContainer />
      </MainTemplate>
    );
  }
}

export default IndexPage;
