"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Document } from "@/components/Element/Document";
import { Loading } from "@/components/View/Loading";
import { useEffect, useState } from "react";

const DocumentPage = () => {
  const router = useRouter();

  const [tempLoading, setTempLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTempLoading(false);
    }, 2000);
  }, [tempLoading]);

  if (tempLoading) {
    return (
      <Loading
        title={"이력서 불러오는중"}
        description={
          "{@이름(카카오연동)}님의 경험과 채용 공고를 바탕으로 면접 질문을 만들고 있어요."
        }
      />
    );
  }

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
          원하는 이력서를 업로드 해주세요
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: COLORS.GRAY100,
            lineHeight: "24px",
          }}
        >
          양식은 상관 없어요. 준비된 이력서를{" "}
          <span className="text-[#00CE72]">PDF 10장 이하</span>로 올려 주세요.
        </Typography>
      </Box>
      <Document />
    </Container>
  );
};

export default DocumentPage;

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
`;
