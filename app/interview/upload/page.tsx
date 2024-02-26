"use client";
import ImageUpload from "@/components/Element/ImageUpload";
import { ShallowHeader } from "@/components/Layout";
import { Loading } from "@/components/View/Loading";
import { userState } from "@/states";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import styled from "@emotion/styled";
import {
  Typography,
  Button,
  Box,
  Modal,
  CircularProgress,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";

const UploadPage = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [textOrImage, setTextOrImage] = useState<"text" | "image" | null>(null);
  const [content, setContent] = useState<string>("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [file, setFile] = useState<File | null>(null);
  const [userRecoilState] = useRecoilState(userState);

  const handleImageUpload = (file: File) => {
    setFile(file);
  };

  // no cache
  const { data } = useQuery({
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

  const insertInterviewMutation = useMutation({
    mutationFn: () => {
      if (!userRecoilState.userId)
        throw new Error("면접을 진행할 유저 정보가 없습니다.");
      const formData = new FormData();
      if (textOrImage === "image" && file) {
        formData.append("file", file as File);
        formData.append(
          "interviewData",
          JSON.stringify({
            userId: userRecoilState.userId,
            resumeId: params.get("resumeId"),
          })
        );
      }
      if (textOrImage === "text") {
        formData.append(
          "interviewData",
          JSON.stringify({
            userId: userRecoilState.userId,
            resumeId: params.get("resumeId"),
            recruitContent: content,
          })
        );
      }

      return axios({
        method: "POST",
        url: "https://api.tikitaka.chat/interview/insertInterview",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: formData,
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        router.push("/interview/question?interviewId=" + data.data.interviewId);
      } else {
        toast.error(data.message);
      }
    },
  });

  if (insertInterviewMutation.isPending) {
    return (
      <Loading
        title="질문을 생성하고 있어요!"
        description="잠시만 기다려주세요."
      />
    );
  }

  return (
    <Container>
      {!textOrImage && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "30px",
          }}
        >
          <Box className="flex flex-col gap-[8px]">
            <Typography
              fontSize={24}
              color={COLORS.WHITE}
              textAlign="center"
              fontWeight={700}
              className="sm:text-[24px] text-[20px]"
            >
              어떤 회사의 직무에 지원하시나요?
            </Typography>
            <Typography
              fontSize={16}
              color={COLORS.GRAY100}
              textAlign="center"
              fontWeight={400}
              className="sm:text-[16px] text-[14px]"
            >
              텍스트나 이미지 형태의 채용 공고를 넣을 수 있어요.
            </Typography>
          </Box>
          <Box
            className="flex flex-row gap-[30px] pt-[10px]"
            sx={{
              "@media (max-width: 768px)": {
                flexDirection: "column !important",
                gap: "10px !important",
                width: "100%",
              },
            }}
          >
            <Button
              sx={{
                width: "300px",
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                "@media (max-width: 768px)": {
                  width: "353px",
                },
                height: "52px",
              }}
              onClick={() => {
                setTextOrImage("text");
              }}
              id="attach-text-button"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.5 10.5H16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 13.5H16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 16.5H16.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8.5 7.5H10.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.5 2.5C13.9379 2.5 6.5 2.5 6.5 2.5C5.39543 2.5 4.5 3.39543 4.5 4.5V19.5C4.5 20.6046 5.39543 21.5 6.5 21.5H18.5C19.6046 21.5 20.5 20.6046 20.5 19.5V4.5C20.5 3.39543 19.6046 2.5 18.5 2.5H15"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              텍스트로 붙여넣기
            </Button>
            <Button
              sx={{
                width: "300px",
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                "@media (max-width: 768px)": {
                  width: "353px",
                },
                height: "52px",
              }}
              onClick={() => {
                setTextOrImage("image");
              }}
              id="attach-image-button"
            >
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.5 3.6V20.4C21.5 20.7314 21.2314 21 20.9 21H4.1C3.76863 21 3.5 20.7314 3.5 20.4V3.6C3.5 3.26863 3.76863 3 4.1 3H20.9C21.2314 3 21.5 3.26863 21.5 3.6Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M3.5 16L10.5 13L21.5 18"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 10C15.3954 10 14.5 9.10457 14.5 8C14.5 6.89543 15.3954 6 16.5 6C17.6046 6 18.5 6.89543 18.5 8C18.5 9.10457 17.6046 10 16.5 10Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              이미지로 붙여넣기
            </Button>
          </Box>
        </Box>
      )}
      {textOrImage === "text" && (
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
          <Box className="flex flex-col gap-[8px] pt-[10px]">
            <Typography
              fontSize={24}
              color={COLORS.WHITE}
              textAlign="center"
              fontWeight={700}
              className="sm:text-[24px] text-[20px]"
            >
              채용공고 내용을 입력해 주세요
            </Typography>
            <ScreenHideWrapper>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: COLORS.GRAY100,
                  lineHeight: "24px",
                }}
                className="sm:text-[16px] text-[14px]"
              >
                회사명, 팀, 직무, 주요업무, 자격요건, 우대사항 6가지 내용 중
                입력 가능한 내용을 입력해 주세요.
              </Typography>
            </ScreenHideWrapper>
            <ScreenShowWrapper>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  color: COLORS.GRAY100,
                  lineHeight: "24px",
                  textAlign: "center",
                }}
                className="sm:text-[16px] text-[14px]"
              >
                회사명, 팀, 직무, 주요업무, 자격요건, 우대사항
                <br />
                6가지 내용 중 입력 가능한 내용을 입력해 주세요.
              </Typography>
            </ScreenShowWrapper>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "300px",
              padding: "20px 16px",
              borderRadius: "5px",
              border: `1px solid ${COLORS.TIKI_GREEN}`,
              background: COLORS.DARK_BG,
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <TextArea
              value={content}
              onChange={(e) => {
                if (e.target.value.length > 1500) {
                  // 1500을 넘으면 일단 1500은 입력되게 하고, 1500자 이상은 입력되지 않게 한다.
                  setContent(e.target.value.slice(0, 1500));
                  return toast.error(
                    "최대 1,500자(2,500byte)까지 입력 가능합니다."
                  );
                }
                setContent(e.target.value);
              }}
              placeholder="채용 공고를 텍스트로 붙여 넣어 주세요. (최대 1,500자(2,500byte))"
            ></TextArea>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                color: COLORS.TIKI_GREEN,
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "15px",
              }}
            >
              (현재 {content.length}자 / 총 1,500자)
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "30px",
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.DARK_BG + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                height: "52px",
              }}
              onClick={() => {
                setTextOrImage("image");
              }}
              id="insert-image-button"
            >
              이미지로 넣을래요
            </Button>
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor:
                  content.length > 0
                    ? COLORS.TIKI_GREEN + " !important"
                    : COLORS.GRAY400 + " !important",
                color: content.length > 0 ? COLORS.WHITE : COLORS.LIGHT_BG,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                width: "155px",
                height: "52px",
              }}
              onClick={() => {
                // 입력한 텍스트 validation
                // 히스토리 개수를 확인하고 5이면 푸시하고 아니면 바로 생성
                if (content.length === 0) {
                  toast.error("텍스트를 입력해주세요.");
                  return;
                }
                if (data.data.length >= 5) {
                  router.push("/interview/history");
                  return;
                }

                insertInterviewMutation.mutate();
              }}
            >
              다음
            </Button>
          </Box>
        </Box>
      )}
      {textOrImage === "image" && (
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
              }}
              className="sm:text-[24px] text-[20px]"
            >
              채용공고를 캡처하여 업로드 해주세요
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: COLORS.GRAY100,
                lineHeight: "24px",
              }}
              className="sm:text-[16px] text-[14px]"
            >
              해당하는 직무 부분만 캡처해서 넣어주세요.
            </Typography>
          </Box>
          <ImageUpload
            open={open2}
            onClose={handleClose2}
            onChange={handleImageUpload}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "30px",
              "@media (max-width: 768px)": {
                display: "none",
              },
            }}
          >
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.DARK_BG + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                height: "52px",
              }}
              onClick={() => {
                setTextOrImage("text");
              }}
              id="insert-text-button"
            >
              텍스트로 넣을래요
            </Button>
            <Button
              sx={{
                display: "flex",
                padding: "18px 24px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: file
                  ? COLORS.TIKI_GREEN + " !important"
                  : COLORS.GRAY400 + " !important",
                color: file ? COLORS.WHITE : COLORS.LIGHT_BG,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                width: "155px",
                height: "52px",
              }}
              onClick={() => {
                // 입력한 이미지 validation
                // 히스토리 개수를 확인하고 5이면 푸시하고 아니면 바로 생성
                if (!file) {
                  toast.error("이미지를 업로드 해주세요.");
                  return;
                }

                if (data.data.length >= 5) {
                  router.push("/interview/history");
                  return;
                }

                insertInterviewMutation.mutate();
              }}
            >
              다음
            </Button>
          </Box>
        </Box>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "23px",
              color: COLORS.WHITE,
              fontWeight: 700,
              lineHeight: "36px",
              fontStyle: "normal",
            }}
          >
            채용 공고를 불러오는 데 실패했어요
          </Typography>
          <Typography
            sx={{
              color: COLORS.GRAY100,
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "24px",
            }}
          >
            잠시 후 다시 시도해 주세요.
          </Typography>
          <Box
            sx={{
              width: "100%",
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
                width: "100%",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                handleClose();
              }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
      {textOrImage !== null && (
        <Box
          sx={{
            width: "100%",
            display: "none",
            position: "absolute",
            bottom: "0px",
            "@media (max-width: 768px)": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
            padding: "0 20px 10px 20px",
            minWidth: "393px",
          }}
        >
          <Button
            sx={{
              display: "flex",
              padding: "18px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              backgroundColor: COLORS.DARK_BG + " !important",
              color: COLORS.WHITE,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "16px",
            }}
            onClick={() => {
              setTextOrImage(textOrImage === "text" ? "image" : "text");
            }}
          >
            {textOrImage === "text" ? "이미지로 넣을래요" : "텍스트로 넣을래요"}
          </Button>
          <Button
            sx={{
              display: "flex",
              padding: "18px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              backgroundColor:
                textOrImage === "image"
                  ? file
                    ? COLORS.TIKI_GREEN + " !important"
                    : COLORS.GRAY400 + " !important"
                  : content.length > 0
                  ? COLORS.TIKI_GREEN + " !important"
                  : COLORS.GRAY400 + " !important",
              color:
                file || content.length > 0 ? COLORS.WHITE : COLORS.LIGHT_BG,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "16px",
              width: "155px",
            }}
            onClick={() => {
              if (textOrImage === "text") {
                // 입력한 텍스트 validation
                // 히스토리 개수를 확인하고 5이면 푸시하고 아니면 바로 생성
                if (content.length === 0) {
                  toast.error("텍스트를 입력해주세요.");
                  return;
                }
                if (data.data.length >= 5) {
                  router.push("/interview/history");
                  return;
                }
              } else {
                // 입력한 이미지 validation
                // 히스토리 개수를 확인하고 5이면 푸시하고 아니면 바로 생성
                if (!file) {
                  toast.error("이미지를 업로드 해주세요.");
                  return;
                }

                if (data.data.length >= 5) {
                  router.push("/interview/history");
                  return;
                }
              }

              insertInterviewMutation.mutate();
            }}
          >
            다음
          </Button>
        </Box>
      )}
      <ShallowHeader />
    </Container>
  );
};

export default UploadPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  padding: 0 20px;
  min-width: 393px;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 1040px;
  outline: none;
  resize: none;
  height: 234px;
  position: relative;
  background: transparent;
  color: ${COLORS.WHITE};
  font-size: 16px;
  &::placeholder {
    color: ${COLORS.GRAY200};
  }
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
