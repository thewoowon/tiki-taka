"use client";
import styled from "@emotion/styled";
import History from "@/components/View/History";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/style/color";
import { useMutation } from "@tanstack/react-query";
import { userState } from "@/states";
import router from "next/router";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { ShallowHeader } from "@/components/Layout";
import customAxios from "@/lib/axios";

const HistoryPage = () => {
  // history fetching

  // 일단 왔다는 것은 -> 면저 히스토리가 5개로 가득 차 있다.

  // 사전에 차단해야한다.
  // 계속 확인 -> 삭제 후 -> refetching이 발생하고 -> 바로 push
  const [userRecoilState] = useRecoilState(userState);

  const insertInterviewMutation = useMutation({
    mutationFn: () => {
      if (!userRecoilState.userId)
        throw new Error("면접을 진행할 유저 정보가 없습니다.");
      const formData = new FormData();
      // if (textOrImage === "image" && file) {
      //   formData.append("file", file as File);
      // }
      // if (textOrImage === "text") {
      //   formData.append(
      //     "interviewData",
      //     JSON.stringify({
      //       userId: userRecoilState.userId,
      //       resumeId: data.data[0].resumeId,
      //       recruitContent: content,
      //     })
      //   );
      // }
      return customAxios({
        method: "POST",
        url: "/interview/insertInterview",
        data: formData,
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        router.push("/interview/question?interviewId=" + data.data.interviewId);
      } else {
        toast.error("면접 생성에 실패했어요. 다시 시도해 주세요.");
      }
    },
  });

  return (
    <Container>
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
          면접을 진행하기 전에
          <br />
          이전 면접 기록 삭제가 필요해요
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
          면접은 최대 5개까지 저장할 수 있어요.
          <br />
          새로운 면접을 진행하려면 이전 기록을 지워 주세요.
        </Typography>
      </Box>
      <History type={"deleteOnly"} />
      <ShallowHeader />
    </Container>
  );
};

export default HistoryPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  gap: 40px;
  padding: 66px 20px;
`;
