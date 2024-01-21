"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import TikitakaLogo from "@/public/svg/tikitaka-logo.svg";
import { TikitakaText } from "@/components/svg";
import { COLORS } from "@/style/color";
import { useRecoilState } from "recoil";
import { loginState } from "@/states";
import TemporaryDrawer from "@/components/Element/Drawer";

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  { pathname: "/history", label: "히스토리" },
];

const ShallowHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pathObj, setPathObj] = useState<{ pathname: string; label: string }>({
    pathname: "/auth/kakao",
    label: "로그인",
  });

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
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <TikitakaText color={COLORS.WHITE} />
          <TikitakaLogo />
        </Logo>
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

export default ShallowHeader;

const Container = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
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
  padding: 0.5rem 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  @media (min-width: 481px) and (max-width: 768px) {
    scale: 0.9;
  }

  @media (max-width: 480px) {
    scale: 0.8;
  }
`;
