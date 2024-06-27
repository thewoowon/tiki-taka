"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import TikitakaLogo from "@/public/svg/tikitaka-logo.svg";
import TikitakaLogoSmall from "@/public/svg/tikitaka-logo-small.svg";
import { TikitakaText } from "@/components/svg";
import { COLORS } from "@/style/color";
import { useRecoilState } from "recoil";
import { loginState, modalState } from "@/states";
import TemporaryDrawer from "@/components/Element/Drawer";
import TikitakaTextMobile from "@/components/svg/TikitakaTextMobile";

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  { pathname: "/article", label: "취업 아티클" },
  { pathname: "/study", label: "취업 스터디 찾기" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pathObj, setPathObj] = useState<{ pathname: string; label: string }>({
    pathname: "/auth/kakao",
    label: "로그인",
  });
  const [state, setState] = useRecoilState(modalState);
  const [isLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    if (isLoggedIn) {
      setPathObj({ pathname: "/mypage", label: "마이페이지" });
    } else {
      setPathObj({ pathname: "/auth/kakao", label: "로그인" });
    }
  }, [isLoggedIn]);
  return (
    <Container>
      <Wrapper>
        <Logo
          onClick={() => {
            setState({ ...state, top: false });
            router.push("/");
          }}
        >
          <TikitakaText color={COLORS.WHITE} />
          <TikitakaLogo />
        </Logo>
        <MobileLogo
          onClick={() => {
            setState({ ...state, top: false });
            router.push("/");
          }}
        >
          <TikitakaTextMobile color={COLORS.WHITE} />
          <TikitakaLogoSmall />
        </MobileLogo>
        <div>
          <Ul>
            {CONSTANT_ROUTER.map((item) => (
              <li
                key={item.pathname}
                onClick={() => router.push(item.pathname)}
                className={pathname.startsWith(item.pathname) ? "active" : ""}
              >
                {item.label}
              </li>
            ))}
            <li
              onClick={() => router.push(pathObj.pathname)}
              className={pathname.startsWith(pathObj.pathname) ? "active" : ""}
            >
              {pathObj.label}
            </li>
          </Ul>
        </div>

        <TemporaryDrawer />
      </Wrapper>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: ${COLORS.DARK_BG};
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  visibility: hidden;

  @media (max-width: 1640px) {
    visibility: visible;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

const Ul = styled.ul`
  color: #404040;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-family: "Pretendard Variable", sans-serif;
  li {
    margin: 0 1rem;
    cursor: pointer;
    color: ${COLORS.WHITE};
  }

  .active {
    color: ${COLORS.TIKI_GREEN};
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const MobileLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: flex;
  }
`;
