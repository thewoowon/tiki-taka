import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { ArticleType } from "@/types";
import { useRouter } from "next/navigation";

const articleList: ArticleType[] = [
  {
    thumbnail: "/assets/article_exam_1.png",
    title: "네이버 채용 공고",
    description: "네이버 채용 공고를 확인하세요",
    company: "네이버",
    author: "네이버",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_2.png",
    title: "카카오 채용 공고",
    description: "카카오 채용 공고를 확인하세요",
    company: "카카오",
    author: "카카오",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_3.png",
    title: "삼성 채용 공고",
    description: "삼성 채용 공고를 확인하세요",
    company: "삼성",
    author: "삼성",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_4.png",
    title: "LG 채용 공고",
    description: "LG 채용 공고를 확인하세요",
    company: "LG",
    author: "LG",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_5.png",
    title: "SK 채용 공고",
    description: "SK 채용 공고를 확인하세요",
    company: "SK",
    author: "SK",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_6.png",
    title: "KT 채용 공고",
    description: "KT 채용 공고를 확인하세요",
    company: "KT",
    author: "KT",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_7.png",
    title: "LG 채용 공고",
    description: "LG 채용 공고를 확인하세요",
    company: "LG",
    author: "LG",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_8.png",
    title: "SK 채용 공고",
    description: "SK 채용 공고를 확인하세요",
    company: "SK",
    author: "SK",
    createdAt: "2022-12-12",
  },
  {
    thumbnail: "/assets/article_exam_9.png",
    title: "KT 채용 공고",
    description: "KT 채용 공고를 확인하세요",
    company: "KT",
    author: "KT",
    createdAt: "2022-12-12",
  },
];

type ArticleViewProps = {
  viewAll: boolean;
};

export const ArticleView = ({ viewAll }: ArticleViewProps) => {
  const router = useRouter();

  return (
    <Container>
      <Flex
        justify={"space-between"}
        style={{
          width: "100%",
        }}
      >
        <Flex gap={6}>
          <Typography fontSize={"24px"} fontWeight={"bold"} color={"#ffffff"}>
            취업 준비 꿀팁 아티클
          </Typography>
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_2565_3519)">
              <path
                d="M21.5641 8.83103C21.8763 8.45513 22.0478 8.08063 22.0478 7.74113C22.0478 6.27463 18.9755 4.14453 14.1616 4.14453C9.34769 4.14453 6.27539 6.27463 6.27539 7.74113C6.27539 8.08063 6.44689 8.45513 6.75909 8.83103C8.25849 7.36593 11.0081 6.38033 14.1616 6.38033C17.3151 6.38033 20.0654 7.36593 21.5641 8.83103Z"
                fill="#2E2423"
              />
              <path
                d="M26.4737 13.8188V14.0148C26.4737 17.4168 25.0947 20.4898 22.8687 22.7228C20.6427 24.9488 17.5627 26.3278 14.1607 26.3278C7.36366 26.3278 1.84766 20.8118 1.84766 14.0148V13.8188C1.84766 11.7958 2.65966 9.96181 3.96866 8.62481V7.88281L3.98266 7.92481C4.03866 8.87681 4.45866 9.77281 5.20066 10.5568C5.35466 10.7178 5.52266 10.8858 5.70466 11.0398C6.07566 11.3548 6.48866 11.6488 6.95066 11.9148C7.64366 12.3138 8.43466 12.6568 9.30266 12.9298C10.7447 13.3848 12.4037 13.6438 14.1607 13.6438C14.4407 13.6438 14.7137 13.6298 14.9797 13.6228V15.4498C14.9797 16.3388 15.7007 17.0598 16.5897 17.0598C17.4787 17.0598 18.1997 16.3388 18.1997 15.4498V13.1608C18.4797 13.0908 18.7527 13.0138 19.0187 12.9298C19.8867 12.6568 20.6777 12.3138 21.3707 11.9148C21.8327 11.6488 22.2527 11.3548 22.6167 11.0398C22.7987 10.8858 22.9667 10.7178 23.1277 10.5568C23.8627 9.77281 24.2897 8.87681 24.3387 7.92481C24.3457 7.90381 24.3597 7.88281 24.3597 7.88281V8.62481C25.6687 9.96181 26.4737 11.7958 26.4737 13.8188Z"
                fill="#694131"
              />
              <path
                d="M5.1974 10.5551C5.3542 10.7224 5.525 10.8848 5.7084 11.0423C6.0745 11.3566 6.4924 11.6492 6.953 11.9166C7.6446 12.3177 8.4356 12.6607 9.3022 12.9337C10.747 13.388 12.4025 13.6463 14.1616 13.6463C14.4388 13.6463 14.7104 13.6351 14.982 13.6225V11.3153C14.7139 11.3293 14.4416 11.3377 14.1616 11.3377C13.8242 11.3377 13.4973 11.3251 13.1774 11.3048V11.6919C13.1774 12.5452 12.4858 13.2375 11.6318 13.2375C10.7778 13.2375 10.0862 12.5452 10.0862 11.6919V10.7623C8.5056 10.2786 7.3597 9.55414 6.7584 8.83104C6.4462 8.45514 6.2747 8.08064 6.2747 7.74114C6.2747 6.27464 9.347 4.14454 14.1609 4.14454C18.9748 4.14454 22.0471 6.27464 22.0471 7.74114C22.0471 8.08064 21.8756 8.45514 21.5634 8.83104C20.9572 9.55974 19.7987 10.2905 18.1999 10.7742V13.1633C18.4792 13.0933 18.7543 13.0177 19.0203 12.9344C19.8869 12.6614 20.6779 12.3184 21.3695 11.9173C21.8308 11.6499 22.248 11.3573 22.6141 11.043C22.7975 10.8862 22.9676 10.7231 23.1244 10.5558C23.8601 9.77184 24.2864 8.87794 24.3382 7.93014C24.3417 7.86644 24.355 7.80484 24.355 7.74114C24.355 4.47984 19.7903 1.83594 14.1602 1.83594C8.5301 1.83594 3.9668 4.47914 3.9668 7.74044C3.9668 7.80414 3.9801 7.86644 3.9836 7.92944C4.0354 8.87724 4.4617 9.77114 5.1974 10.5551Z"
                fill="#825B50"
              />
              <path
                d="M21.5667 8.82891C20.9577 9.55691 19.8027 10.2919 18.1997 10.7749V15.4509C18.1997 16.3399 17.4787 17.0609 16.5897 17.0609C15.7007 17.0609 14.9797 16.3399 14.9797 15.4509V11.3139C14.7137 11.3279 14.4407 11.3349 14.1607 11.3349C13.8247 11.3349 13.4957 11.3209 13.1807 11.3069V11.6919C13.1807 12.5459 12.4877 13.2389 11.6337 13.2389C10.7797 13.2389 10.0867 12.5459 10.0867 11.6919V10.7609C8.50472 10.2779 7.36372 9.54991 6.76172 8.82891C8.25972 7.36591 11.0107 6.37891 14.1607 6.37891C17.3107 6.37891 20.0687 7.36591 21.5667 8.82891Z"
                fill="#FFBF00"
              />
            </g>
            <defs>
              <clipPath id="clip0_2565_3519">
                <rect width="28" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Flex>

        <Flex>
          {viewAll && (
            <Flex
              onClick={() => {
                router.push("/article");
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <Typography fontSize={"18px"} fontWeight={600} color={"#ffffff"}>
                전체보기
              </Typography>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.1724 12.0007L8.22266 7.05093L9.63688 5.63672L16.0008 12.0007L9.63688 18.3646L8.22266 16.9504L13.1724 12.0007Z"
                  fill="white"
                />
              </svg>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Grid>
        {
          // ArticleCard
          articleList.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))
        }
      </Grid>
    </Container>
  );
};

export default ArticleView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1040px;
  gap: 24px;
`;

const Flex = styled.div<{
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "flex-end" | "space-between";
  align?: "center" | "flex-start" | "flex-end";
  gap?: number;
}>`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || 0}px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 16px;
  row-gap: 32px;
  width: 100%;
  max-width: 1040px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
