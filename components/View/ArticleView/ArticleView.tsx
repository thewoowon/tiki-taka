import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import ArticleCard from "./ArticleCard";
import { ArticleType } from "@/types";
import { useRouter } from "next/navigation";
import { COLORS } from "@/style/color";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import customAxios from "@/lib/axios";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Loading } from "../Loading";

type GetArticleListResponse = {
  code: string;
  data: ArticleType[];
  message: string;
};

type ArticleViewProps = {
  viewAll: boolean;
};

export const ArticleView = ({ viewAll }: ArticleViewProps) => {
  const router = useRouter();
  const [categoryForm, setCategoryForm] = useState<{
    mainCategory: number;
    category: number[];
  }>({
    mainCategory: 0,
    category: [],
  });
  const [articleList, setArticleList] = useState<ArticleType[]>([]);
  const [mainCategoryList, setMainCategoryList] = useState<
    {
      categoryId: number;
      categoryName: string;
    }[]
  >([]);
  const [categoryList, setCategoryList] = useState<
    {
      categoryId: number;
      categoryName: string;
    }[]
  >([]);

  const fetchArticles = async ({
    pageParam = 0,
  }): Promise<GetArticleListResponse> => {
    const response = await customAxios({
      method: "GET",
      url: `/article/getArticleList`,
      params: {
        categoryIdList: categoryForm.category.includes(0)
          ? []
          : categoryForm.category,
        startNumber: pageParam,
        offsetNumber: 10,
      },
    });
    return response.data;
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    status,
  } = useInfiniteQuery({
    queryKey: ["articles", categoryForm.mainCategory, categoryForm.category],
    queryFn: fetchArticles,
    getNextPageParam: (lastPage, pages) => {
      if (!lastPage.data || lastPage.data.length === 0) {
        return undefined;
      }
      return pages.length * 10;
    },
    initialPageParam: 0, // Add the initialPageParam property with a value of 0
    enabled: categoryForm.category.length > 0,
  });

  const loadMoreRef = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  const { data: mainCategoryData } = useQuery({
    queryKey: ["mainCategory"],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/article/getMainCategoryList",
      }).then((res) => res.data);
    },
  });

  const { data: categoryData } = useQuery({
    queryKey: ["category", categoryForm.mainCategory],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/article/getCategoryList",
        params: {
          categoryId: categoryForm.mainCategory,
        },
      }).then((res) => res.data);
    },
    enabled: categoryForm.mainCategory !== 0,
  });

  useEffect(() => {
    if (data) {
      setArticleList([...data.pages.flatMap((page) => page.data)]);
    }
  }, [data]);

  useEffect(() => {
    if (mainCategoryData) {
      if (mainCategoryData.code === "200") {
        setMainCategoryList(mainCategoryData.data);
        setCategoryForm({
          ...categoryForm,
          mainCategory: mainCategoryData.data[0].categoryId,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainCategoryData]);

  useEffect(() => {
    if (categoryData) {
      if (categoryData.code === "200") {
        setCategoryList([
          {
            categoryId: 0,
            categoryName: "전체",
          },
          ...categoryData.data,
        ]);
        setCategoryForm({
          ...categoryForm,
          category: [0],
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryData]);

  useEffect(() => {
    refetch();
  }, [categoryForm, refetch]);
  return (
    <Container>
      <Flex
        direction="column"
        align="flex-start"
        style={{
          width: "100%",
        }}
        gap={18}
      >
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
                <Typography
                  fontSize={"18px"}
                  fontWeight={600}
                  color={"#ffffff"}
                >
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
        {!viewAll && (
          <>
            <Flex gap={6} style={{
              marginTop: "2px",
            }}>
              <Typography
                fontSize={"18px"}
                fontWeight={"bold"}
                color={"#ffffff"}
              >
                추천
              </Typography>
              <svg
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2665_9723)">
                  <path
                    d="M16.9837 16.9204L18.4558 8.63963C18.5209 8.27333 18.1486 7.99283 17.8378 8.17488L15.2149 9.71103C14.4826 10.14 13.558 9.89198 13.1123 9.14728L10.8559 5.37813C10.691 5.10312 10.3088 5.10312 10.1445 5.37813L7.88805 9.14728C7.44232 9.89198 6.5178 10.1395 5.78542 9.71103L3.16252 8.17488C2.85172 7.99283 2.4795 8.27278 2.5446 8.63963L4.0167 16.9204"
                    fill="#FFCD00"
                  />
                  <path
                    d="M16.153 19.5344H4.84768C4.34893 19.5344 4.0166 19.1862 4.0166 18.6637V16.9219H16.9841V18.6637C16.9841 19.0993 16.6518 19.5344 16.153 19.5344Z"
                    fill="#FFAD00"
                  />
                  <path
                    d="M10.5007 5.17302C11.2352 5.17302 11.8305 4.54928 11.8305 3.77987C11.8305 3.01045 11.2352 2.38672 10.5007 2.38672C9.76628 2.38672 9.1709 3.01045 9.1709 3.77987C9.1709 4.54928 9.76628 5.17302 10.5007 5.17302Z"
                    fill="#FFAD00"
                  />
                  <path
                    d="M19.1453 8.55974C19.8797 8.55974 20.4751 7.936 20.4751 7.16659C20.4751 6.39717 19.8797 5.77344 19.1453 5.77344C18.4108 5.77344 17.8154 6.39717 17.8154 7.16659C17.8154 7.936 18.4108 8.55974 19.1453 8.55974Z"
                    fill="#FFAD00"
                  />
                  <path
                    d="M1.85522 8.55974C2.58966 8.55974 3.18504 7.936 3.18504 7.16659C3.18504 6.39717 2.58966 5.77344 1.85522 5.77344C1.12077 5.77344 0.525391 6.39717 0.525391 7.16659C0.525391 7.936 1.12077 8.55974 1.85522 8.55974Z"
                    fill="#FFAD00"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2665_9723">
                    <rect width="21" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <Flex
                gap={16}
                style={{
                  marginLeft: "16px",
                }}
              >
                {
                  mainCategoryList.map((category) => (
                    <Typography
                      key={category.categoryId}
                      fontSize={"18px"}
                      fontWeight={"regular"}
                      color={COLORS.GRAY200}
                      onClick={() => {
                        setCategoryForm({
                          ...categoryForm,
                          mainCategory: category.categoryId,
                        });
                      }}
                      sx={{
                        cursor: "pointer",
                        color:
                          categoryForm.mainCategory === category.categoryId
                            ? COLORS.WHITE
                            : COLORS.GRAY200,

                        "&:hover": {
                          color: COLORS.WHITE,
                        },
                      }}
                    >
                      {category.categoryName}
                    </Typography>
                  ))
                }
              </Flex>
            </Flex>
            <Flex
              gap={10}
              style={{
                flexWrap: "wrap",
              }}
              justify="flex-start"
            >
              {categoryList.map((category) => (
                <Tag
                  selected={categoryForm.category.includes(category.categoryId)}
                  key={category.categoryId}
                  onClick={() => {
                    // 그냥 유니크로 태그를 관리하자
                    setCategoryForm({
                      ...categoryForm,
                      category: [category.categoryId],
                    });
                    // if (category.categoryId === 0) {
                    //   if (categoryForm.category.includes(category.categoryId)) {
                    //     // 이미 전체가 있을 때 -> 전체만 있는 상황임 -> 풀지 않음
                    //   } else {
                    //     // 전체가 없을 때 -> 전체 추가 -> 나머지 다 없애기
                    //     setCategoryForm({
                    //       ...categoryForm,
                    //       category: [0],
                    //     });
                    //   }
                    // } else {
                    //   if (categoryForm.category.includes(0)) {
                    //     setCategoryForm({
                    //       ...categoryForm,
                    //       category: [
                    //         ...categoryForm.category.filter(
                    //           (categoryId) => categoryId !== 0
                    //         ),
                    //         category.categoryId,
                    //       ],
                    //     });
                    //   } else {
                    //     if (
                    //       categoryForm.category.includes(category.categoryId)
                    //     ) {
                    //       // 이미 있을 때 -> 빼기 -> 그런데 filter
                    //       const filtered = categoryForm.category.filter(
                    //         (categoryId) => categoryId !== category.categoryId
                    //       );
                    //       setCategoryForm({
                    //         ...categoryForm,
                    //         category: filtered.length === 0 ? [0] : filtered,
                    //       });
                    //     } else {
                    //       setCategoryForm({
                    //         ...categoryForm,
                    //         category: [
                    //           ...categoryForm.category,
                    //           category.categoryId,
                    //         ],
                    //       });
                    //     }
                    //   }
                    // }
                  }}
                >
                  {" "}
                  {category.categoryName}
                </Tag>
              ))}
            </Flex>
          </>
        )}
      </Flex>
      {articleList.length > 0 ? (
        <Grid>
          {articleList.map((article, index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </Grid>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 24,
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: COLORS.WHITE,
            }}
          >
            아직 글이 없어요..🤣
          </Typography>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: COLORS.WHITE,
            }}
          >
            다른 카테고리를 선택해보세요!
          </Typography>
        </div>
      )}

      <div ref={loadMoreRef} style={{ height: 1 }} />
      {isFetching && !isFetchingNextPage && (
        <Loading
          title="데이터를 가져오고 있어요!🥳"
          description="조금만 기다려주세요!"
        />
      )}
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
  gap: 40px;
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

const Tag = styled.div<{ selected: boolean }>`
  padding: 8px 16px;
  border-radius: 100px;
  background-color: ${(props) =>
    props.selected ? COLORS.TIKI_DARK_GREEN : "transparent"};
  color: ${(props) => (props.selected ? COLORS.WHITE : COLORS.GRAY200)};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  line-height: 1.5;
  border: ${(props) =>
    props.selected
      ? `1px solid ${COLORS.TIKI_DARK_GREEN}`
      : `1px solid ${COLORS.GRAY200}`};
`;
