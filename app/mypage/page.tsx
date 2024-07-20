"use client";
import { SimpleDocument } from "@/components/Element/Document";
import { ShallowHeader } from "@/components/Layout";
import Profile from "@/components/View/Profile";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import History from "@/components/View/History";
import Subscription from "@/components/View/Subscription";
import { useState } from "react";
import { modalStyle } from "@/style/modal";

const MyPage = () => {
  return (
    <Container>
      <ProfileBox className="flex flex-col justify-center items-center w-full">
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
            textAlign: "center",
            "@media (max-width: 1024px)": {
              fontSize: "20px",
            },
          }}
        >
          내 정보
        </Typography>
        <Profile />
      </ProfileBox>
      <SubscriptionBox className="flex flex-col justify-center items-center w-full">
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
            textAlign: "center",
            "@media (max-width: 1024px)": {
              fontSize: "20px",
            },
          }}
        >
          구독 정보
        </Typography>
        <Subscription />
      </SubscriptionBox>
      <ResumeBox className="flex flex-col justify-center items-center w-full">
        <Box className="flex flex-col justify-center items-center gap-[8px] w-full">
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: COLORS.WHITE,
              lineHeight: "36px",
              textAlign: "center",
            }}
          >
            이력서 관리
          </Typography>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: COLORS.GRAY100,
              lineHeight: "24px",
              textAlign: "center",
            }}
          >
            이력서는 최대 3개까지 업로드 할 수 있어요.
          </Typography>
        </Box>
        <SimpleDocument />
      </ResumeBox>
      <Box className="flex flex-col justify-center items-center gap-[8px] pt-[10px]">
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
            textAlign: "center",
          }}
        >
          면접 히스토리
        </Typography>
      </Box>
      <History type={"all"} />
      <ShallowHeader />
    </Container>
  );
};

export default MyPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  padding: 66px 20px 44px 20px;
  overflow-y: auto;
  gap: 100px;

  @media (max-width: 1024px) {
    gap: 50px;
  }
`;

const ProfileBox = styled(Box)`
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 30px;
  }
`;

const SubscriptionBox = styled(Box)`
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 30px;
  }
`;

const ResumeBox = styled(Box)`
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 30px;
  }
`;
