import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="https://github.com/Sh031224" target="_blank">
          © 2020. Sh031224. All rights reserved.
        </a>
        <Link className="footer-container-privacy" to="/?privacy">
          개인정보 처리방침
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
