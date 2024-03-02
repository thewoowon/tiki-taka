"use client";
import React, { use, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { usePathname, useRouter } from "next/navigation";
import TikitakaLogo from "@/public/svg/tikitaka-logo.svg";
import { COLORS } from "@/style/color";
import { TikitakaText } from "@/components/svg";
import Typography from "@/components/Element/Typography";
import { useRecoilState } from "recoil";
import { loginState, userState } from "@/states";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/axios";
import axios from "axios";

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  //{ pathname: "/history", label: "히스토리" },
];

const SideBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pathObj, setPathObj] = useState<{ pathname: string; label: string }>({
    pathname: "/auth/kakao",
    label: "로그인",
  });

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [, setUserState] = useRecoilState(userState);

  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  const { isLoading, data } = useQuery({
    queryKey: ["userInfo", "get"],
    queryFn: () => {
      return axios({
        withCredentials: true,
        baseURL: "https://api.tikitaka.chat",
        method: "GET",
        url: `/user/getUserInfo`,
      })
        .then((res) => res.data ?? {})
        .catch((err) => err.response.data);
    },
    // 캐시를 사용하지 않음
    staleTime: 0,
  });

  useEffect(() => {
    if (isLoggedIn) {
      setPathObj({ pathname: "/mypage", label: "마이페이지" });
    } else {
      setPathObj({ pathname: "/auth/kakao", label: "로그인" });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoading || !data) return;
    if (data?.code === "950") {
      setUserState({
        email: "",
        profileImage: "",
        nickname: "",
        userId: null,
      });
      setIsLoggedIn(false);
    } else if (data?.code === "200") {
      setUserState({
        email: data.data.email,
        profileImage: data.data.profileImage,
        nickname: data.data.nickname,
        userId: data.data.userId,
      });
      setIsLoggedIn(true);
    }
  }, [data, isLoading, setIsLoggedIn, setUserState]);

  return (
    <Container>
      <Wrapper>
        <Flex
          direction="column"
          justify="flex-start"
          align="flex-start"
          gap={60}
        >
          <Logo
            className="cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <TikitakaText color={COLORS.WHITE} />
            <TikitakaLogo />
          </Logo>
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
        </Flex>
        <Flex direction="column" gap={30} align="flex-start">
          <Flex gap={6}>
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.00065 15.1666C7.02572 15.1666 8.66732 13.525 8.66732 11.5C8.66732 9.47491 7.02572 7.83331 5.00065 7.83331C2.9756 7.83331 1.33398 9.47491 1.33398 11.5C1.33398 12.1678 1.51254 12.794 1.82452 13.3333L1.51732 14.9833L3.16732 14.6761C3.70664 14.9881 4.33279 15.1666 5.00065 15.1666Z"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1881 12.4318C10.839 12.327 11.4504 12.1043 11.9999 11.7864L14.3999 12.2333L13.953 9.83331C14.4068 9.04885 14.6665 8.13805 14.6665 7.16665C14.6665 4.22113 12.2787 1.83331 9.33321 1.83331C6.64829 1.83331 4.42676 3.8173 4.05469 6.39921"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Typography fontSize={14} color={COLORS.GRAY200}>
              <Link
                href={"https://open.kakao.com/o/sUonPQYf"}
                className="cursor-pointer hover:text-white"
                target="_blank"
              >
                고객센터
              </Link>
            </Typography>
          </Flex>
          <Flex gap={16} direction="column" align="flex-start">
            <Typography fontSize={14} color={COLORS.GRAY200}>
              스톤즈랩
            </Typography>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              contact us. <br />
              <Link
                href={"mailto:chat.tikitaka@gmail.com"}
                className="cursor-pointer hover:text-white"
              >
                chat.tikitaka
                <span style={{ color: COLORS.TIKI_GREEN }}>@</span>
                gmail.com
              </Link>
            </Typography>
            <Flex gap={8}>
              <Typography
                fontSize={11}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_terms_of_use.pdf",
                    "tikitaka_terms_of_use.pdf"
                  );
                }}
              >
                이용약관
              </Typography>
              <Typography fontSize={11} color={COLORS.GRAY200}>
                |
              </Typography>
              <Typography
                fontSize={11}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_consent_to_collection_and_use_of_personal_information.pdf",
                    "tikitaka_consent_to_collection_and_use_of_personal_information.pdf"
                  );
                }}
              >
                개인정보처리방침
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Wrapper>
    </Container>
  );
};

export default SideBar;

const Container = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: ${COLORS.DARK_BG};
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  height: calc(var(--vh, 1vh) * 100);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;

  @media (max-width: 1640px) {
    visibility: hidden;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 250px;
  padding: 30px;
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  color: ${COLORS.WHITE};
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  list-style: none;
  gap: 30px;

  .active {
    color: ${COLORS.TIKI_GREEN};
  }

  li {
    cursor: pointer;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${COLORS.TIKI_GREEN};
    }
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 6px;
`;

const Flex = styled.div<{
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "flex-end";
  align?: "center" | "flex-start" | "flex-end";
  gap?: number;
}>`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || 0}px;
`;
