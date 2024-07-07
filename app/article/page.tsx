"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { Box } from "@mui/material";
import { COLORS } from "@/style/color";
import dynamic from "next/dynamic";

const ArticleView = dynamic(() => import("@/components/View/ArticleView"), {
  ssr: false,
});

const ArticlePage = () => {
  return (
    <Container>
      <Box
        position={"relative"}
        width={"100%"}
        height={"266px"}
        maxWidth={"1040px"}
        borderRadius={"10px"}
        overflow={"hidden"}
      >
        <div
          style={{
            position: "absolute",
            top: "0",
            width: "100%",
            height: "100%",
            color: COLORS.WHITE,
            zIndex: 1,
            padding: "36px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Title>
              기회는 주어지는 것이 아니라, <br />
              만들어내는 것
            </Title>
            <Description>
              지금 구독하고 누구보다 빠르게 취업에 성공하세요!
            </Description>
          </div>
          <Button>아티클 구독하기</Button>
        </div>
        <Image
          loader={({ src }) => (src ? src : "/assets/article-banner.png")}
          src="/assets/article-banner.png"
          alt="thumbnail"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <ArticleView viewAll={false} />
    </Container>
  );
};

export default ArticlePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 24px;
  padding: 48px 24px;
`;

const Flex = styled.div<{
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  align?: "center" | "flex-start" | "flex-end";
  gap?: number;
}>`
  width: 100%;
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || 0}px;
`;

const Button = styled.button`
  padding: 20px 40px;
  border-radius: 8px;
  background-color: ${COLORS.TIKI_GREEN};
  color: ${COLORS.WHITE};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;

  &:hover {
    background-color: ${COLORS.TIKI_GREEN};
  }

  &:active {
    background-color: ${COLORS.TIKI_GREEN};
  }

  @media (max-width: 768px) {
    padding: 16px 32px;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    padding: 12px 24px;
    font-size: 12px;
  }
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Description = styled.div`
  font-size: 20px;
  font-weight: medium;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 18px;
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;
