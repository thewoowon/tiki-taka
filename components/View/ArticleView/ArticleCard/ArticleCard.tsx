import { ArticleType } from "@/types";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

type ArticleCardProps = {
  article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Container>
      <Wrapper>
        <Box
          sx={{
            backgroundColor: "white",
            cursor: "pointer",
          }}
          width={"336px"}
          height={"200px"}
          position={"relative"}
          borderRadius={"10px"}
          overflow={"hidden"}
        >
          <Image src={article.thumbnail} alt="thumbnail" fill priority />
        </Box>
        <Flex justify="flex-start">
          <Typography
            fontSize={"14px"}
            color={"#B9B9B9"}
          >{`${article.company} | ${article.author}`}</Typography>
          <Typography fontSize={"14px"} color={"#B9B9B9"}>
            {article.createdAt}
          </Typography>
        </Flex>
        <Flex
          justify="flex-start"
          gap={8}
          direction={"column"}
          align="flex-start"
        >
          <Typography
            fontSize={"18px"}
            lineHeight={"26px"}
            fontWeight={"bold"}
            color={"white"}
            style={{ cursor: "pointer" }}
          >
            {article.title}
          </Typography>
          <Flex justify="flex-start">
            <Typography fontSize={"16px"} lineHeight={"24px"} color={"#E8E8E8"}>
              {article.description}
            </Typography>
          </Flex>
        </Flex>
      </Wrapper>
    </Container>
  );
};

export default ArticleCard;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  max-width: 336px;
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
