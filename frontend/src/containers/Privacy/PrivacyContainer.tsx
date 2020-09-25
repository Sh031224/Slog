import React, { useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import Privacy from "../../components/Privacy";

const PrivacyContainer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>{"Slog"}</title>
        <meta
          name="description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta name="og:title" content="Slog" data-react-helmet="true" />
        <meta
          property="og:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta
          property="og:url"
          content="https://slog.website/"
          data-react-helmet="true"
        />
        <meta
          property="og:image"
          content="https://data.slog.website/public/op_logo.png"
          data-react-helmet="true"
        />
        <meta name="twitter:title" content="Slog" data-react-helmet="true" />
        <meta
          property="twitter:description"
          content="많은 사람들에게 유용한 정보를 제공하기 위해 제작한 Slog입니다."
          data-react-helmet="true"
        />
        <meta
          property="twitter:image"
          content="https://data.slog.website/public/op_logo.png"
          data-react-helmet="true"
        />
      </Helmet> */}
      <Privacy />
    </>
  );
};

export default PrivacyContainer;
