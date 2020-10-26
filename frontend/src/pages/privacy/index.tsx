import GetCookie from "lib/GetCookie";
import { DocumentContext } from "next/document";
import dynamic from "next/dynamic";
import React from "react";

const MainTemplate = dynamic(
  () => import("components/common/Template/MainTemplate")
);
const PrivacyContainer = dynamic(
  () => import("containers/Privacy/PrivacyContainer")
);
interface PrivacyProps {
  token?: string;
}

class Privacy extends React.Component<PrivacyProps> {
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
    const { token } = this.props;

    return (
      <MainTemplate token={token}>
        <PrivacyContainer />
      </MainTemplate>
    );
  }
}

export default Privacy;
