import Link from "next/link";
import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <a href="https://github.com/Sh031224" target="_blank" rel="noopener">
          © 2020. Sh031224. All rights reserved.
        </a>
        <>
          <Link href="/privacy">
            <a>
              <FooterPrivacy>개인정보 처리방침</FooterPrivacy>
            </a>
          </Link>
        </>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const FooterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.device.mobile} {
    flex-direction: column;
  }
  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.ftGray};
    font-size: 0.9rem;
  }
`;

const FooterPrivacy = styled.div`
  color: ${({ theme }) => theme.colors.ftDarkGray} !important;
  margin-left: 1rem;
  display: inline-block;
  ${({ theme }) => theme.device.mobile} {
    margin-left: 0;
  }
`;

export default Footer;
