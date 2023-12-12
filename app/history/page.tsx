"use client";

import { COLORS } from "@/style/color";
import { Box, Typography } from "@mui/material";
import History from "@/components/View/History";
import styled from "@emotion/styled";

const HistoryPage = () => {
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
          면접 히스토리
        </Typography>
      </Box>
      <History type={"all"} />
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
