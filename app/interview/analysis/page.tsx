"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const AnalysisPage = () => {
  const params = useParams();
  const router = useRouter();
  const [textOrImage, setTextOrImage] = useState<"text" | "image" | null>(null);
  const [content, setContent] = useState<string>("");
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
            >
              어떤 회사의 직무에 지원하시나요?
            </Typography>
            <Typography
              fontSize={16}
              color={COLORS.WHITE}
              textAlign="center"
              fontWeight={400}
            >
              텍스트나 이미지 형태의 채용 공고를 넣을 수 있어요.
            </Typography>
          </Box>
          <Box className="flex flex-row gap-[30px] pt-[10px]">
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
              }}
              onClick={() => {
                setTextOrImage("text");
              }}
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 13.5H16.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 16.5H16.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 7.5H10.5"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.5 2.5C13.9379 2.5 6.5 2.5 6.5 2.5C5.39543 2.5 4.5 3.39543 4.5 4.5V19.5C4.5 20.6046 5.39543 21.5 6.5 21.5H18.5C19.6046 21.5 20.5 20.6046 20.5 19.5V4.5C20.5 3.39543 19.6046 2.5 18.5 2.5H15"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
              }}
              onClick={() => {
                setTextOrImage("image");
              }}
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.5 16L10.5 13L21.5 18"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.5 10C15.3954 10 14.5 9.10457 14.5 8C14.5 6.89543 15.3954 6 16.5 6C17.6046 6 18.5 6.89543 18.5 8C18.5 9.10457 17.6046 10 16.5 10Z"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
            >
              채용 공고 내용을 입력해 주세요
            </Typography>
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
                if (e.target.value.length > 1500)
                  return alert("최대 1,500자(2,500byte)까지 입력 가능합니다.");
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
                setTextOrImage("image");
              }}
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
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
              }}
              onClick={() => {
                setTextOrImage("image");
              }}
            >
              다음
            </Button>
          </Box>
        </Box>
      )}
      {textOrImage === "image" && (
        <Box>
          <Box className="flex flex-col gap-[8px] pt-[10px]">
            <Typography
              fontSize={24}
              color={COLORS.WHITE}
              textAlign="center"
              fontWeight={700}
            >
              어떤 회사의 직무에 지원하시나요?
            </Typography>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default AnalysisPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
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
`;
