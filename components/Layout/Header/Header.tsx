"use client";
import React from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import TikitakaLogo from "@/public/svg/tikitaka-logo.svg";
import TikitakaText from "@/public/svg/tikitaka-text.svg";

const CONSTANT_ROUTER = [
  { pathname: "/", label: "AI면접" },
  { pathname: "/product", label: "히스토리" },
  { pathname: "/auth/kakao", label: "로그인" },
];

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <Container>
      <Wrapper>
        <Logo
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <TikitakaText />
          <TikitakaLogo />
        </Logo>
        <div>
          <Ul>
            {CONSTANT_ROUTER.map((item) => (
              <li
                key={item.pathname}
                onClick={() => router.push(item.pathname)}
                className={pathname === item.pathname ? "active" : ""}
              >
                {item.label}
              </li>
            ))}
          </Ul>
        </div>
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
  padding: 0 1rem;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #f3f3f3;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
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
`;
