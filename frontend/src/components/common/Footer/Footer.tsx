import React from "react";
import Link from "next/link";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="https://github.com/Sh031224" target="_blank">
          © 2020. Sh031224. All rights reserved.
        </a>
        <Link href="/privacy">
          <a className="footer-container-privacy">개인정보 처리방침</a>
        </Link>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
