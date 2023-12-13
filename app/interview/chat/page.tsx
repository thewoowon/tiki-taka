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
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      id: 1,
      role: "interviewer",
      content:
        "카카오페이를 선택한 동기와 흥미로운 경험에 대해 어떤 것이 있나요?",
    },
    {
      id: 2,
      role: "interviewer",
      content:
        "카카오페이가 추구하는 가치 중에서 가장 중요하게 생각하는 것은 무엇인가요?",
    },
    {
      id: 3,
      role: "interviewer",
      content:
        "디지털 금융 분야에서의 최근 트렌드와 그에 따른 도전에 대한 여러분의 시각은 무엇인가요?",
    },
    {
      id: 4,
      role: "interviewer",
      content:
        "카카오페이의 경쟁사와 차별화된 전략에 대해 어떻게 생각하시나요?",
    },
    {
      id: 5,
      role: "interviewer",
      content:
        "금융 서비스 개발 프로세스에서의 여러 경험과 성과에 대해 소개해주세요.",
    },
    {
      id: 6,
      role: "interviewer",
      content: "카카오페이에서의 팀 프로젝트 경험 중 가장 도전적이었던 부분은?",
    },
    {
      id: 7,
      role: "interviewer",
      content: "고객 중심의 서비스를 제공하기 위해 노력한 경험과 그 결과는?",
    },
    {
      id: 8,
      role: "ai",
      content:
        "기술적인 도전이나 문제에 직면했을 때 해결한 사례를 공유해주실 수 있나요?",
    },
    {
      id: 9,
      role: "interviewer",
      content:
        "기술적인 도전이나 문제에 직면했을 때 해결한 사례를 공유해주실 수 있나요?",
    },
    {
      id: 10,
      role: "interviewer",
      content:
        "카카오페이에서 근무하면서 성장하고 싶은 점과 학습 계획이 있나요?",
    },
  ]);

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
