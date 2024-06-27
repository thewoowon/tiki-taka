"use client";

import ArticleView from "@/components/View/ArticleView";
import styled from "@emotion/styled";
import Image from "next/image";
import { Box } from "@mui/material";
import { Loading } from "@/components/View/Loading";

const ArticlePage = () => {
  return (
    <Loading title="오픈 준비 중이에요 🥳" description="조금만 기다려주세요!" />
  );

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
        <Image
          src="/assets/article-banner.png"
          alt="thumbnail"
          fill
          priority
          style={{
            objectFit: "cover",
          }}
        />
      </Box>
      <ArticleView viewAll={false} />;
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
