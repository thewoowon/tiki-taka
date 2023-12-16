"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { COLORS } from "@/style/color";
import { Button, Typography } from "@mui/material";
import ChatView from "@/components/View/ChatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import { useRouter, useSearchParams } from "next/navigation";

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
  // 공고 자료를 보내고 응답을 받는다.
  const params = useSearchParams();

  // 어떤 회사인지에 대한 정보를 받는다.
  const router = useRouter();

  const [userRecoilState] = useRecoilState(userState);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [indicator, setIndicator] = useState(0);

  const { isLoading, data } = useQuery({
    queryKey: ["questions", userRecoilState.userId, params.get("interviewId")],
    queryFn: () => {
      return axios({
        method: "GET",
        url: `https://tikitakachatdata.com/interview/getQaList?userId=${
          userRecoilState.userId
        }&interviewId=${params.get("interviewId")}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
        },
      })
        .then((res) => res.data)
        .catch((err) => console.log(err, err.response));
    },
  });

  useEffect(() => {
    if (data && data.code === "200") {
      const newQuestions = [];
      for (let index = 0; index < data.data.qaData.length; index++) {
        const element = data.data.qaData[index];

        const newQuestion = {
          ...element,
          role: "interviewer",
        };
        newQuestions.push(newQuestion);
      }
      setQuestions(newQuestions);
    }
  }, [data]);

  if (isLoading) return <div>loading...</div>;

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
        interviewId={Number(params.get("interviewId") ?? 0)}
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
            value={Math.floor(((indicator) / questions.length) * 100)}
          />
          <Button
            sx={{
              display: "flex",
              padding: "8px 10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "5px",
              border: `1px solid ${COLORS.GRAY100}`,
              color: COLORS.GRAY100,
              position: "absolute",
              top: "34px",
              right: "27px",
            }}
            onClick={() => {
              router.push("/history");
            }}
          >
            그만하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InterviewChatPage;
