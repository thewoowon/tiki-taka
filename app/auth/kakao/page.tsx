"use client";
import GoogleButton from "@/components/Element/Button/Google";
import KakaoButton from "@/components/Element/Button/Kakao/KakaoButton";
import { ShallowHeader } from "@/components/Layout";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Link from "next/link";

// 애초에 로그인이 되어 있다면 마이페이지로 이동

const KakaoLoginPage = () => {
  return (
    <Container>
      <Box>
        <Typography
          fontSize={24}
          color={COLORS.WHITE}
          textAlign="center"
          fontWeight={700}
          lineHeight={"36px"}
          sx={{
            "@media (max-width: 1024px)": {
              fontSize: "20px",
            },
          }}
        >
          AI 면접 진행을 위해
          <br />
          로그인이 필요해요
        </Typography>
        <div className="pt-[30px] pb-[20px] flex flex-col gap-[6px]">
          <GoogleButton />
          <KakaoButton />
        </div>
        {/* <div className="flex w-full justify-between">
          <LinkText href={"#"}>처음이신가요?</LinkText>
          <LinkText href={"#"} textDecoration="underline" fontWeight={500}>
            회원가입
          </LinkText>
        </div> */}
      </Box>
      <ShallowHeader />
    </Container>
  );
};

export default KakaoLoginPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  height: 296px;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  background-color: ${COLORS.DARK_BG};
  border-radius: 20px;

  @media (max-width: 1024px) {
    padding: 30px 20px;
    height: 272px;
  }
`;

const LinkText = styled(Link)<{
  color?: string;
  fontSize?: number;
  fontWeight?: number;
  textAlign?: string;
  textDecoration?: string;
}>`
  color: ${(props) => props.color || COLORS.WHITE};
  font-size: ${(props) => props.fontSize || 14}px;
  font-style: normal;
  font-weight: ${(props) => props.fontWeight || 400};
  line-height: 24px; /* 150% */
  text-align: ${(props) => props.textAlign || "left"};
  text-decoration: ${(props) => props.textDecoration || "none"};
  text-underline-offset: 2px;
  cursor: pointer;
`;
