import { ArticleType } from "@/types";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

type ArticleCardProps = {
  article: ArticleType;
};

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isValidThumbnail, setIsValidThumbnail] = useState(false);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    const validateImage = async () => {
      if (article.thumbnail) {
        try {
          const response = await fetch(
            `/api/checkImage?url=${encodeURIComponent(article.thumbnail)}`
          );
          const data = await response.json();
          setIsValidThumbnail(data.isValid);
        } catch {
          setIsValidThumbnail(false);
        }
      }
    };

    validateImage();
  }, [article.thumbnail]);
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
          <Image
            loader={({ src }) => (src ? src : "/assets/tikitaka-thumbnail.png")}
            src={
              isValidThumbnail
                ? article.thumbnail
                : "/assets/tikitaka-thumbnail.png"
            }
            alt="thumbnail"
            fill
            priority
          />
        </Box>
        <Flex justify="space-between">
          <Typography
            fontSize={"14px"}
            color={"#B9B9B9"}
          >{`${article.companyName}`}</Typography>
          <Typography fontSize={"14px"} color={"#B9B9B9"}>
            {
              // YYYYMMDD -> YYYY-MM-DD
              article.published
                .slice(0, 8)
                .replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3")
            }
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
              {truncateText(
                // 태그, 특수문자 제거, 처음 공백 제거, &#160; 제거 50자로 자르기
                article.description
                  .replace(/<[^>]*>?/gm, "")
                  .trim()
                  .replace(/&nbsp;/g, " ")
                  .replace(/&#160;/g, ""),
                50
              )}
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
