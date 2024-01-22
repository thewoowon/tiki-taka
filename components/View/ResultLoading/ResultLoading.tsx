import { SimulationResultLoading } from "@/components/Element/Loading";
import { COLORS } from "@/style/color";
import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import styled from "@emotion/styled";

const Loading = ({
  title,
  description,
}: {
  title: ReactNode;
  description: ReactNode;
}) => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: COLORS.GRAY100,
            lineHeight: "24px",
          }}
        >
          {description}
        </Typography>
        <SimulationResultLoading />
      </Box>
    </Container>
  );
};

export default Loading;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1040px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
  padding: 66px 20px;
`;
