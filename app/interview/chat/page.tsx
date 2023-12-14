"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState } from "react";
import { COLORS } from "@/style/color";
import { Typography } from "@mui/material";
import ChatView from "@/components/View/ChatView";
import { questionsList } from "@/constants/list";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: COLORS.TIKI_GREEN,
  },
  width: "100%",
  maxWidth: "1040px",
}));

const InterviewChatPage = () => {
  const [questions, setQuestions] = useState<QuestionType[]>(questionsList);

  const [indicator, setIndicator] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        maxWidth: "1040px",
        width: "100%",
        gap: "40px",
        margin: "0 auto",
      }}
    >
      <ChatView
        questions={questions}
        indicator={indicator}
        setIndicator={setIndicator}
      />
      <Box
        sx={{
          width: "100%",
          height: "104px",
          background: COLORS.DARK_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "fixed",
          top: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "1040px",
            width: "100%",
            gap: "16px",
          }}
        >
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "18px",
            }}
          >
            {"카카오페이 서비스 기획자"} 모의 면접 중...
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            value={Math.floor(((indicator + 1) / questions.length) * 100)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewChatPage;
