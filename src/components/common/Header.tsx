import React from "react";
import HeadRoom from "react-headroom";
import styled from "styled-components";
import logo from "assets/images/logo.png";
import useHeader from "hooks/useHeader";
import ScrollToTop from "react-scroll-to-top";
import { GrLinkTop } from "react-icons/gr";
import { ReactCompnent as SearchImg } from "../../assets/images/search.svg";
import useFacebookLogin from "hooks/useFacebookLogin";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Link from "next/link";

const Header: React.FC = () => {
  const {
    search,
    isToggle,
    searchEl,
    changeIsToggle,
    onChangeSearch,
    onSubmitSearch,
    onKeypressSearch
  } = useHeader();

  const { login, appId, tryLogin, tryLogout } = useFacebookLogin();

  return (
    <>
      <HeadRoom>
        <HeaderWrapper>
          <HeaderContainer>
            <HeaderNav>
              <Link href="/">
                <a>
                  <HeaderLogo src={logo} alt={"Slog"} />
                </a>
              </Link>
              <HeaderUtils>
                <HeaderSearch onClick={changeIsToggle} isToogle={isToggle}>
                  <HeaderSearchInput
                    ref={searchEl}
                    isToogle={isToggle}
                    type="text"
                    value={search}
                    onChange={onChangeSearch}
                    onKeyPress={onKeypressSearch}
                    placeholder={"검색어를 입력해주세요."}
                  />
                  <SearchImg onClick={onSubmitSearch} />
                </HeaderSearch>
                {login ? (
                  <HeaderLink onClick={tryLogout}>로그아웃</HeaderLink>
                ) : (
                  <FacebookLogin
                    appId={appId}
                    callback={tryLogin}
                    fields="name,email"
                    disableMobileRedirect={true}
                    render={(renderProps: any) => {
                      return <HeaderLink onClick={renderProps.onClick}>로그인</HeaderLink>;
                    }}
                  />
                )}
              </HeaderUtils>
            </HeaderNav>
          </HeaderContainer>
        </HeaderWrapper>
      </HeadRoom>
      <ScrollToTop smooth component={<GrLinkTop />} />
    </>
  );
};

const HeaderWrapper = styled.header`
  top: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.colors.sdLightBlack} 0px 2px 10px 0px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
  ${({ theme }) => theme.device.mobile} {
    padding: 0 0.5rem;
  }
`;

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    display: flex;
    align-items: center;
  }
`;

const HeaderLogo = styled.img`
  cursor: pointer;
  width: 2.5rem;
  ${({ theme }) => theme.device.mobile} {
    width: 2rem;
  }
`;

const HeaderUtils = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderLink = styled.span`
  color: ${({ theme }) => theme.colors.ftGray};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  ${({ theme }) => theme.device.mobile} {
    font-size: 0.8rem;
  }
`;

const HeaderSearch = styled.div<{ isToogle: boolean }>`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  overflow: hidden;
  border-radius: 1.8rem;
  margin-right: 1rem;
  max-width: 195px;
  border: ${({ theme }) => theme.colors.bdLightGray} 1px solid;
  transition: all ease-in-out 0.5s 0s;
  display: flex;
  align-items: center;
  ${({ isToogle }) =>
    isToogle
      ? "justify-content: flex-start; width: 11.5rem;"
      : "justify-content: center; width: 1.8rem;"}
  ${({ theme }) => theme.device.mobile} {
    width: ${({ isToogle }) => (isToogle ? "10rem" : "1.5rem")};
    height: 1.5rem;
    border-radius: 1.5rem;
  }

  & > svg {
    width: 0.8rem;
    height: 0.8rem;
    cursor: pointer;
    opacity: 0.5;
  }
`;

const HeaderSearchInput = styled.input<{ isToogle: boolean }>`
  color: ${({ theme }) => theme.colors.ftGray};
  display: ${({ isToogle }) => (isToogle ? "inline-block" : "none")};
  width: calc(100% - 1.5rem);
  max-width: 165px;
  height: 1.8rem;
  padding-left: 1rem;
  padding-right: 0.5rem;
  border: none;
  outline: none;
  font-size: 0.8rem;
  font-weight: 500;
  ${({ theme }) => theme.device.mobile} {
    height: 1.5rem;
    width: calc(100% - 2rem);
    font-size: 0.7rem;
  }
`;

export default React.memo(Header);
