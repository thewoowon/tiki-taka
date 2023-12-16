"use client";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useEffect, useState } from "react";
import { COLORS } from "@/style/color";
import { Button, Modal, Typography } from "@mui/material";
import ChatView from "@/components/View/ChatView";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { modalStyle } from "@/style/modal";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRecoilState] = useRecoilState(userState);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [indicator, setIndicator] = useState(0);
  const [history, setHistory] = useState<HistoryElementType>({
    interviewId: 0,
    userId: 0,
    title: "",
    totalCnt: 0,
    useCnt: 0,
    status: 0,
    regDate: "",
  });

  const { data: interviewData } = useQuery({
    queryKey: ["interview", userRecoilState.userId, params.get("interviewId")],
    queryFn: () => {
      return axios({
        method: "GET",
        url:
          "https://tikitakachatdata.com/interview/getInterview?userId=" +
          userRecoilState.userId +
          "&interviewId=" +
          params.get("interviewId"),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
  });

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

  useEffect(() => {
    if (interviewData) {
      if (interviewData.code === "로그인이 필요합니다") {
        toast.error("로그인이 필요합니다.");
        router.push("/auth/kakao");
      }
      if (interviewData.code === "200") {
        setHistory(interviewData.data);
      }
    }
  }, [interviewData, params, router]);

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
        title={history.title}
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
            {history.title} 모의 면접 중...
          </Typography>
          <BorderLinearProgress
            variant="determinate"
            value={Math.floor((indicator / questions.length) * 100)}
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
              handleOpen();
              //router.push("/history");
            }}
          >
            그만하기
          </Button>
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: "23px",
              color: COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            면접을 종료할까요?
          </Typography>
          <Typography
            sx={{
              color: COLORS.GRAY100,
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          >
            면접 내용은 히스토리에 자동으로 확인 가능해요
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                color: COLORS.TIKI_GREEN,
              }}
              onClick={handleClose}
            >
              계속 진행
            </Button>
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                router.push("/history");
              }}
            >
              종료
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default InterviewChatPage;
