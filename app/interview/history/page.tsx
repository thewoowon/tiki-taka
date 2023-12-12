"use client";
import styled from "@emotion/styled";
import History from "@/components/View/History";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/style/color";

const HistoryPage = () => {
  // history fetching

  // 일단 왔다는 것은 -> 면저 히스토리가 5개로 가득 차 있다.

  // 사전에 차단해야한다.
  // 계속 확인 -> 삭제 후 -> refetching이 발생하고 -> 바로 push

  return (
    <Container>
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
          면접을 진행하기 전에
          <br />
          이전 면접 기록 삭제가 필요해요
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
          면접은 최대 5개까지 저장할 수 있어요.
          <br />
          새로운 면접을 진행하려면 이전 기록을 지워 주세요.
        </Typography>
      </Box>
      <History type={"deleteOnly"} />
    </Container>
  );
};

export default HistoryPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 40px;
  overflow: scroll;
  padding: 66px auto;
`;
