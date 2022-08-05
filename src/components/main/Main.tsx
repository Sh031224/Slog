/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from "next/link";
import { GoPencil } from "react-icons/go";
import { useSelector } from "react-redux";
import type { RootState } from "stores/modules";
import styled from "styled-components";
import MainCategories from "./category/MainCategories";
import MainPosts from "./post/MainPosts";

const Main: React.FC = () => {
  const { is_admin } = useSelector((state: RootState) => state.user.data.user);

  return (
    <MainWrapper>
      {is_admin && (
        <Link href="/handle/[idx]" as="/handle/new">
          <a>
            <MainCreatePost>
              <GoPencil />
            </MainCreatePost>
          </a>
        </Link>
      )}
      <MainContainer>
        <MainPosts />
        <MainCategories />
      </MainContainer>
    </MainWrapper>
  );
};

const MainWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 5rem;
  ${({ theme }) => theme.device.smallDesktop} {
    padding-top: 0;
  }
`;

const MainCreatePost = styled.div`
  position: fixed;
  left: 40px;
  bottom: 40px;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.colors.bgBlue};
  color: ${({ theme }) => theme.colors.ftWhite};
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 1px 4px 5px ${({ theme }) => theme.colors.sdBlack};
  z-index: 10;
`;

const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  ${({ theme }) => theme.device.smallDesktop} {
    flex-direction: column-reverse;
  }
`;

export default Main;
