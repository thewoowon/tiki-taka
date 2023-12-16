"use client";
import { SimpleDocument } from "@/components/Element/Document";
import Profile from "@/components/View/Profile";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

const MyPage = () => {
  // 여기서 로그인 여부를 확인하고 안되어 있으면 -> 로그인 페이지로 이동
  return (
    <Container>
      <Box className="flex flex-col justify-center items-center gap-[40px] pt-[10px] w-full">
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
            textAlign: "center",
          }}
        >
          내 정보
        </Typography>
        <Profile />
      </Box>
      <Box className="flex flex-col justify-center items-center gap-[40px] w-full">
        <Box className="flex flex-col justify-center items-center gap-[8px] pt-[10px] w-full">
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
      </Box>
    </Container>
  );
};

export default MyPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 100px;
  padding: 66px auto;
`;
