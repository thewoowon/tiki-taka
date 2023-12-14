"use client";
import { COLORS } from "@/style/color";
import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import Question from "@/components/View/Question";
import { useRouter } from "next/navigation";
import { questionsList } from "../chat/page";

const QuestionPage = () => {
  // 공고 자료를 보내고 응답을 받는다.

  // 어떤 회사인지에 대한 정보를 받는다.
  const router = useRouter();

  const [data, setData] = useState({
    name: "카카오페이",
    questions: questionsList,
  });

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1040px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
            {data.name} 면접에
            <br />딱 맞는 질문을 가져왔어요
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
            아래 질문 중에 연습하고 싶은 질문을 골라주세요.
            <br />
            연습이 더 필요하면, [마이페이지 {">"} 히스토리] 에서 질문을 확인 후
            다시 진행해도 돼요.
          </Typography>
        </Box>
        <Question questions={data.questions} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{
              display: "flex",
              padding: "18px 24px",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "16px",
              border: `1px solid ${COLORS.TIKI_GREEN}`,
              color: COLORS.TIKI_GREEN,
            }}
            onClick={() => {}}
          >
            전체 질문 복사
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.DARK_BG + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
              }}
              onClick={() => {}}
            >
              질문 다시 만들기
            </Button>
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
              }}
              onClick={() => {
                // 입력한 텍스트 validation
                // 히스토리 개수를 확인하고 5이면 푸시하고 아니면 바로 생성
                router.push("/interview/chat");
              }}
            >
              면접 보기
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default QuestionPage;

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
