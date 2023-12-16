"use client";
import { COLORS } from "@/style/color";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Question from "@/components/View/Question";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import toast from "react-hot-toast";

const QuestionPage = () => {
  // 공고 자료를 보내고 응답을 받는다.
  const params = useSearchParams();

  // 어떤 회사인지에 대한 정보를 받는다.
  const router = useRouter();

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
          "https://tikitakachatdata.com/interview/getInterviewList?userId=" +
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

  const fileUploadMutation = useMutation({
    mutationFn: () => {
      if (!userRecoilState.userId)
        throw new Error("userRecoilState.userId is null");
      return axios({
        method: "POST",
        url: "https://tikitakachatdata.com/interview/generateQa",
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

  if (interviewsIsLoading || isLoading) return <div>loading...</div>;

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
            }}
          >
            연습이 더 필요하면, [마이페이지 {">"} 히스토리] 에서 질문을 확인 후
            다시 진행해도 돼요.
          </Typography>
        </Box>
        <Question questions={questions} />
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
                fileUploadMutation.mutate();
              }}
            >
              {isLoading || fileUploadMutation.isPending ? (
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
              }}
              onClick={() => {
                router.push(
                  "/interview/chat?interviewId=" + params.get("interviewId")
                );
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
  padding: 66px auto;
`;
