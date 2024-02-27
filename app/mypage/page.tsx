"use client";
import { SimpleDocument } from "@/components/Element/Document";
import { ShallowHeader } from "@/components/Layout";
import Profile from "@/components/View/Profile";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const MyPage = () => {
  // 여기서 로그인 여부를 확인하고 안되어 있으면 -> 로그인 페이지로 이동
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
  padding: 66px 20px 0 20px;
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

const ResumeBox = styled(Box)`
  gap: 40px;

  @media (max-width: 1024px) {
    gap: 30px;
  }
`;
