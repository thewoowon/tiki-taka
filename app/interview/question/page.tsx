"use client";
import { COLORS } from "@/style/color";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Question from "@/components/View/Question";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import toast from "react-hot-toast";
import { ResultLoading } from "@/components/View/ResultLoading";
import { ShallowHeader } from "@/components/Layout";
import { Loading } from "@/components/View/Loading";
import { modalStyle } from "@/style/modal";

const QuestionPage = () => {
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
  const [questions, setQuestions] = useState<QuestionElementType[]>([]);
  const [histories, setHistories] = useState<HistoryElementType[]>([]);

  const handleCopyClipBoard = async () => {
    try {
      const text = questions.map((question) => question.question).join("\n");

      await navigator.clipboard.writeText(text);
      toast.success("클립보드에 질문을 복사했어요.", {
        icon: "📋",
        position: "top-right",
      });
    } catch (e) {
      toast.error("복사에 실패했어요. 다시 시도해 주세요.");
    }
  };

  // no cache
  const { isLoading: interviewsIsLoading, data: interviewsData } = useQuery({
    queryKey: ["interviews", userRecoilState.userId],
    queryFn: () => {
      return axios({
        method: "GET",
        url:
          "https://api.tikitaka.chat/interview/getInterviewList?userId=" +
          userRecoilState.userId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["questions", params.get("interviewId")],
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

  const generateMutation = useMutation({
    mutationFn: () => {
      if (!userRecoilState.userId)
        throw new Error("userRecoilState.userId is null");
      return axios({
        method: "POST",
        url: "https://api.tikitaka.chat/interview/generateQa",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
          interviewId: params.get("interviewId"),
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.success("질문 재생성에 성공했어요.");
      refetch();
    },
    onError: (error) => {
      toast.error("질문 재생성에 실패했어요. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (data) {
      setQuestions(data.data.qaData);
    }
  }, [data]);

  useEffect(() => {
    if (interviewsData) {
      setHistories(interviewsData.data);
    }
  }, [interviewsData]);

  if (interviewsIsLoading || isLoading)
    return (
      <Loading
        title="질문을 가져오고 있어요!"
        description="잠시만 기다려주세요."
      />
    );

  if (generateMutation.isPending) {
    return (
      <ResultLoading
        title={"질문 재생성 중"}
        description={
          <Typography>
            ${userRecoilState.nickname}님의 이력서와 채용공고를 바탕으로
            <br />
            면접 질문을 재생성하고 있어요.
          </Typography>
        }
      />
    );
  }

  return (
    <Container>
      <Box
        sx={{
          width: "100%",
          maxWidth: "1040px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box className="flex flex-col justify-center items-center gap-[8px] pt-[10px] px-[20px]">
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: COLORS.WHITE,
              lineHeight: "36px",
              textAlign: "center",
              "@media (max-width: 1024px)": {
                fontSize: "20px",
              },
            }}
          >
            {
              histories.find(
                (history) =>
                  history.interviewId === Number(params.get("interviewId"))
              )?.title
            }{" "}
            면접에
            <br />딱 맞는 질문을 가져왔어요
          </Typography>

          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: COLORS.GRAY100,
              lineHeight: "24px",
              textAlign: "center",
              "@media (max-width: 1024px)": {
                fontSize: "14px",
              },
            }}
          >
            면접을 진행할 질문을 골라주세요.
            <br />
            생성된 질문은 [히스토리]에서 확인할 수 있어요.
          </Typography>
        </Box>
        <Question questions={questions} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width: 1024px)": {
              bottom: "10px",
              width: "100%",
              padding: "0 20px",
            },
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
              "@media (max-width: 1024px)": {
                display: "none",
              },
            }}
            onClick={async () => {
              await handleCopyClipBoard();
            }}
          >
            전체 질문 복사
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "30px",
              "@media (max-width: 1024px)": {
                width: "100%",
                justifyContent: "space-between",
              },
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
              onClick={() => {
                generateMutation.mutate();
              }}
            >
              {isLoading || generateMutation.isPending ? (
                <CircularProgress
                  size={18}
                  sx={{
                    color: COLORS.WHITE,
                  }}
                />
              ) : (
                "질문 다시 만들기"
              )}
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
                width: "155px",
              }}
              onClick={() => {
                handleOpen();
                // const isContinue = params.get("continue") === "true";
                // if (isContinue) {
                //   router.push(
                //     "/interview/chat?interviewId=" +
                //       params.get("interviewId") +
                //       "&continue=true"
                //   );
                //   return;
                // }
                // router.push(
                //   "/interview/chat?interviewId=" + params.get("interviewId")
                // );
              }}
            >
              면접 시작
            </Button>
          </Box>
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
            곧 업데이트 될 예정이에요
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",
              width: "100%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                width: "100%",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
      <ShallowHeader
        sx={{}}
        right={
          <Box
            onClick={() => {
              const element = document.createElement("a");
              const file = new Blob(
                [questions.map((question) => question.question).join("\n")],
                { type: "text/plain" }
              );
              element.href = URL.createObjectURL(file);
              element.download = "interview.txt";
              document.body.appendChild(element); // Required for this to work in FireFox
              element.click();
              toast.success("다운로드에 성공했어요.");
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"
                fill="white"
              />
            </svg>
          </Box>
        }
      />
    </Container>
  );
};

export default QuestionPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  width: 100%;
  gap: 40px;
  padding: 66px 0px;
`;

const ScreenHideWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ScreenShowWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
