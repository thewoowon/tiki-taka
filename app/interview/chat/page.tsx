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
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { modalStyle } from "@/style/modal";
import { ResultLoading } from "@/components/View/ResultLoading";
import { Loading } from "@/components/View/Loading";
import { ShallowHeader } from "@/components/Layout";

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
  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") return;
    if (reason === "escapeKeyDown") return;
    setOpen(false);
  };
  const [userRecoilState] = useRecoilState(userState);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [indicator, setIndicator] = useState(0);
  const [lastQaId, setLastQaId] = useState(0);
  const [history, setHistory] = useState<HistoryElementType>({
    interviewId: 0,
    userId: 0,
    title: "",
    totalCnt: 0,
    useCnt: 0,
    status: 0,
    regDate: "",
  });
  const [chatStack, setChatStack] = useState<QuestionType[]>([]);

  const { data: interviewData } = useQuery({
    queryKey: ["interview", userRecoilState.userId, params.get("interviewId")],
    queryFn: () => {
      return axios({
        method: "GET",
        url:
          "https://api.tikitaka.chat/interview/getInterview?userId=" +
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
        url: `https://api.tikitaka.chat/interview/getQaList?userId=${
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

  const saveAnswerMutation = useMutation({
    mutationFn: (answerData: { qaId: number; answer: string }[]) => {
      return axios({
        method: "POST",
        url: "https://api.tikitaka.chat/interview/insertAnswer",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
          interviewId: Number(params.get("interviewId")),
          lastBtnCk: 0,
          answerData,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        toast.success("답변 저장에 성공했어요.");
        router.push("/history");
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("답변 저장에 실패했어요. 다시 시도해 주세요.");
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
      setLastQaId(data.data.lastQaId);
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

  if (isLoading)
    return (
      <Loading
        title="질문을 가져오고 있어요!"
        description="잠시만 기다려주세요."
      />
    );

  if (saveAnswerMutation.isPending) {
    return (
      <ResultLoading
        title={"중간 저장 중"}
        description={`${userRecoilState.nickname}님의 답변을 저장하고 있어요.`}
      />
    );
  }

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
        setSyncChatStack={setChatStack}
        isContinue={params.get("continue") === "true"}
        lastQaId={lastQaId}
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
          "@media (max-width: 1024px)": {
            display: "none",
          },
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
            padding: "0 20px",
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
            value={
              Math.floor((indicator / questions.length) * 100) === 0
                ? 1
                : Math.floor((indicator / questions.length) * 100)
            }
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
              onClick={() => {
                setOpen(false);
              }}
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
              onClick={async () => {
                const answerData: {
                  qaId: number;
                  answer: string;
                }[] = [];
                for (let index = 0; index < chatStack.length; index++) {
                  if (!chatStack[index]) continue;
                  const { qaId, answer, role } = chatStack[index];
                  if (role === "user") {
                    answerData.push({
                      qaId,
                      answer,
                    });
                  }
                }
                await saveAnswerMutation.mutate(answerData);
              }}
            >
              종료
            </Button>
          </Box>
        </Box>
      </Modal>
      <ShallowHeader
        sx={{}}
        center={
          <Typography
            sx={{
              color: COLORS.WHITE,
              fontSize: "18px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "18px",
            }}
          >
            <span
              style={{
                color: COLORS.TIKI_GREEN,
              }}
            >
              {history.title}
            </span>{" "}
            모의 면접 중...
          </Typography>
        }
        right={
          <Button
            sx={{
              color: COLORS.GRAY400,
            }}
            onClick={() => {
              handleOpen();
            }}
          >
            그만하기
          </Button>
        }
        bottom={
          <BorderLinearProgress
            variant="determinate"
            value={
              Math.floor((indicator / questions.length) * 100) === 0
                ? 1
                : Math.floor((indicator / questions.length) * 100)
            }
          />
        }
      />
    </Box>
  );
};

export default InterviewChatPage;
