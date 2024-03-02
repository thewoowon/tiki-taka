"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import { COLORS } from "@/style/color";
import { useRecoilState } from "recoil";
import { loginState, modalState } from "@/states";
import { Box, SxProps } from "@mui/material";
import TemporaryDrawer from "@/components/Element/Drawer";

type ShallowHeaderProps = {
  sx?: SxProps;
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
};

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  //{ pathname: "/history", label: "히스토리" },
];

const ShallowHeader = ({
  left,
  center,
  right,
  top,
  bottom,
}: ShallowHeaderProps) => {
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
      {top && <Box>{top}</Box>}
      <Wrapper>
        {left ? (
          <Box>{left}</Box>
        ) : (
          <Box
            onClick={() => {
              // 뒤로가기
              setState({ ...state, top: false });
              router.back();
            }}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.82843 10.9999H21V12.9999H6.82843L13.1924 19.3638L11.7782 20.778L3 11.9999L11.7782 3.22168L13.1924 4.63589L6.82843 10.9999Z"
                fill="white"
              />
            </svg>
          </Box>
        )}
        <Box>{center}</Box>

        <Box>
          {right ? (
            right
          ) : (
            <>
              <Box>
                <Ul>
                  {CONSTANT_ROUTER.map((item) => (
                    <li
                      key={item.pathname}
                      onClick={() => router.push(item.pathname)}
                      className={
                        pathname.startsWith(item.pathname) ? "active" : ""
                      }
                    >
                      {item.label}
                    </li>
                  ))}
                  <li
                    onClick={() => router.push(pathObj.pathname)}
                    className={
                      pathname.startsWith(pathObj.pathname) ? "active" : ""
                    }
                  >
                    {pathObj.label}
                  </li>
                </Ul>
              </Box>
              <TemporaryDrawer />
            </>
          )}
        </Box>
      </Wrapper>
      {bottom && (
        <Box
          sx={{
            maxWidth: "1024px",
            width: "100%",
          }}
        >
          {bottom}
        </Box>
      )}
    </Container>
  );
};

export default ShallowHeader;

const Container = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  max-width: 1024px;

  @media (min-width: 1025px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1024px;
  margin: 0 auto;
  width: 100%;
  height: 60px;
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
    margin: 0 20px;
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
