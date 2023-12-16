"use client";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { COLORS } from "@/style/color";
import Interviewer from "@/public/svg/interviewer.svg";
import { Box, Button, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { userState } from "@/states";
import { useRecoilState } from "recoil";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

type FeedbackType = {
  id: number;
  question: string;
  keywords: string[];
  myAnswer: string;
  aiAnswer: string;
};

const InterviewResultPage = () => {
  const params = useSearchParams();
  const [userRecoilState] = useRecoilState(userState);
  const router = useRouter();

  const [downloadLink, setDownloadLink] = useState<string>("");

  const [result, setResult] = useState<ResultType>({
    interviewId: 0,
    interviewerFeel: "",
    userId: 0,
    title: "",
    status: 0,
    regDate: "",
    feedback: "string",
    qaData: [],
  });

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["result", userRecoilState.userId, params.get("interviewId")],
    queryFn: () => {
      return axios({
        method: "GET",
        url: `https://tikitakachatdata.com/interview/getInterview?userId=${
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

  const downloadMutation = useMutation({
    mutationFn: (interviewId: number) => {
      return axios({
        method: "GET",
        url:
          "https://tikitakachatdata.com/interview/downloadInterview?userId=" +
          userRecoilState.userId +
          "&interviewId=" +
          interviewId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
          interviewId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      const element = document.createElement("a");
      const file = new Blob([data], { type: "text/plain" });
      element.href = URL.createObjectURL(file);
      element.download = "interview.txt";
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      toast.success("다운로드에 성공했어요.");
    },
    onError: () => {
      toast.error("다운로드에 실패했어요. 다시 시도해 주세요.");
    },
  });

  const regenerateMutation = useMutation({
    mutationFn: (interviewId: number) => {
      return axios({
        method: "GET",
        url: "https://tikitakachatdata.com/interview/generateFeedback",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
          interviewId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        toast.success("피드백 재생성에 성공했어요.");
        refetch();
      } else toast.error(data.message);
    },
    onError: () => {
      toast.error("재생성에 실패했어요. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (data?.code === "200") {
      setResult(data.data);
    }
  }, [data]);

  useEffect(() => {
    const url =
      "https://tikitakachatdata.com/interview/downloadInterview?userId=" +
      userRecoilState.userId +
      "&interviewId=" +
      params.get("interviewId");

    setDownloadLink(url);
  }, [params, userRecoilState.userId]);

  return (
    <Container>
      <Box
        sx={{
          paddingTop: "144px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Pretendard Variable",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "36px",
            color: COLORS.WHITE,
          }}
        >
          <span
            style={{
              color: COLORS.TIKI_GREEN,
            }}
          >
            {userRecoilState.nickname}
          </span>
          님, 수고하셨어요. 합격까지 한걸음 가까워졌네요!
        </Typography>
        <Typography
          sx={{
            fontFamily: "Pretendard Variable",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "24px",
            color: COLORS.GRAY100,
          }}
        >
          티키타카가 면접 결과를 저장했어요. 나의 면접 히스토리에서 언제든지
          확인 가능해요.
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: "10px",
            fontSize: "18px",
            fontStyle: "normal",
            fontWeight: "600",
            lineHeight: "18px",
            color: COLORS.WHITE,
          }}
        >
          <Interviewer />
          {"면접관의 속마음"}
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "16px 20px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "10px",
            borderRadius: "5px",
            border: `1px solid ${COLORS.TIKI_GREEN}`,
            background: COLORS.DARK_BG,
            color: COLORS.GRAY100,
          }}
        >
          {result.interviewerFeel}
        </Box>
      </Box>
      {result.qaData.map((feed, index) => {
        return (
          <Box
            key={index}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {index == 0 && (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: "8px",
                  marginBottom: "10px",
                }}
              >
                <svg
                  width="98"
                  height="18"
                  viewBox="0 0 98 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M60.7243 16.1514L57.2447 13.0347C57.2447 13.0347 58.9525 11.946 60.4468 10.0887L57.2447 10.1955L57.0312 6.69452L62.3254 6.8653C62.4748 6.4597 62.5815 6.03275 62.6669 5.58446L57.7784 5.86197V1.7206H68.1745C68.1745 11.1988 60.7243 16.1514 60.7243 16.1514ZM68.5801 0.525146H74.4246V5.90467L76.1537 5.81928V11.455L74.4246 11.3909V17.4749C73.5493 17.4322 72.7168 17.4109 72.0123 17.4109C70.6034 17.4109 69.6641 17.4749 69.6641 17.4749H69.5574V2.93739L68.5801 0.525146Z"
                    fill="white"
                  />
                  <path
                    d="M42.0865 15.4683C38.9911 15.4683 37.6463 14.2301 37.6463 11.6898V4.09015L36.605 1.7206H47.8716V5.32829L42.5348 5.15751V6.56643L47.893 6.39566L47.6795 9.89661L42.5348 9.74718V10.5157C42.5348 11.2628 42.855 11.3269 43.3673 11.3269C45.3099 11.3269 48.1705 11.1134 48.1705 11.1134L47.9997 15.4683H42.0865ZM48.448 0.525146H54.2924V5.90467L56.0215 5.81928V11.455L54.2924 11.3909V17.4749C51.624 17.3468 49.4252 17.4749 49.4252 17.4749V2.93739L48.448 0.525146Z"
                    fill="white"
                  />
                  <path
                    d="M22.2341 16.1514L18.7545 13.0347C18.7545 13.0347 20.4623 11.946 21.9566 10.0887L18.7545 10.1955L18.541 6.69452L23.8351 6.8653C23.9846 6.4597 24.0913 6.03275 24.1767 5.58446L19.2882 5.86197V1.7206H29.6843C29.6843 11.1988 22.2341 16.1514 22.2341 16.1514ZM30.0899 0.525146H35.9343V17.4749C35.0591 17.4322 34.2265 17.4109 33.5221 17.4109C32.1132 17.4109 31.1739 17.4749 31.1739 17.4749H31.0671V2.93739L30.0899 0.525146Z"
                    fill="white"
                  />
                  <path
                    d="M5.48151 15.4683C2.38615 15.4683 1.04127 14.2301 1.04127 11.6898V4.09015L0 1.7206H11.2666V5.32829L5.92981 5.15751V6.56643L11.288 6.39566L11.0745 9.89661L5.92981 9.74718V10.5157C5.92981 11.2628 6.25002 11.3269 6.76235 11.3269C8.70496 11.3269 11.5655 11.1134 11.5655 11.1134L11.3947 15.4683H5.48151ZM11.843 0.525146H17.6874V17.4749C15.019 17.3468 12.8202 17.4749 12.8202 17.4749V2.93739L11.843 0.525146Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M90.8 0H87.2V4.65441L83.9088 1.36325L81.3632 3.90883L84.6544 7.2H80V10.8H84.6544L81.3632 14.0911L83.9088 16.6368L87.2 13.3456V18H90.8V13.3456L94.0912 16.6368L96.6368 14.0912L93.3456 10.8H98V7.2H93.3456L96.6368 3.90883L94.0912 1.36324L90.8 4.65441V0Z"
                    fill="#00CE72"
                  />
                </svg>{" "}
                <Typography
                  sx={{
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "18px",
                    color: COLORS.WHITE,
                  }}
                >
                  피드백
                </Typography>
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  padding: "4px 8px",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "20px",
                  background: COLORS.TIKI_DARK_GREEN,
                  fontSize: " 13px",
                  fontStyle: " normal",
                  fontWeight: " 500",
                  lineHeight: " normal",
                  color: COLORS.WHITE,
                }}
              >
                질문 {index + 1}
              </Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "600",
                  lineHeight: "24px",
                  color: COLORS.WHITE,
                }}
              >
                {feed.question}
              </Typography>
            </Box>
            <Tags>
              {feed.keyword?.map((keyword, index) => {
                return <Tag key={index}>{keyword}</Tag>;
              })}
            </Tags>
            <Box
              sx={{
                display: "flex",
                padding: "16px 20px",
                borderRadius: "5px",
                background: COLORS.DARK_BG,
                color: COLORS.GRAY100,
                minHeight: "56px",
                height: "auto",
              }}
            >
              {feed.answer ?? "내 답변 내용"}
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "16px 20px",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "10px",
                borderRadius: "5px",
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                background: COLORS.DARK_BG,
                color: COLORS.GRAY100,
                minHeight: "84px",
                height: "auto",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  gap: "4px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="78"
                    height="14"
                    viewBox="0 0 78 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M47.8433 12.6343L45.1018 10.1787C45.1018 10.1787 46.4473 9.32091 47.6246 7.85766L45.1018 7.94175L44.9336 5.18344L49.1047 5.31799C49.2224 4.99843 49.3065 4.66205 49.3738 4.30885L45.5223 4.5275V1.26462H53.7131C53.7131 8.73225 47.8433 12.6343 47.8433 12.6343ZM54.0327 0.322754H58.6373V4.56114L59.9997 4.49386V8.93407L58.6373 8.88362V13.677C57.9478 13.6434 57.2918 13.6266 56.7368 13.6266C55.6267 13.6266 54.8867 13.677 54.8867 13.677H54.8026V2.2233L54.0327 0.322754Z"
                      fill="white"
                    />
                    <path
                      d="M33.1586 12.096C30.7198 12.096 29.6602 11.1205 29.6602 9.11908V3.13152L28.8398 1.26462H37.7165V4.10703L33.5118 3.97247V5.08253L37.7334 4.94797L37.5652 7.70629L33.5118 7.58856V8.19404C33.5118 8.7827 33.7641 8.83316 34.1677 8.83316C35.6983 8.83316 37.952 8.66497 37.952 8.66497L37.8174 12.096H33.1586ZM38.1706 0.322754H42.7753V4.56114L44.1376 4.49386V8.93407L42.7753 8.88362V13.677C40.6729 13.5761 38.9406 13.677 38.9406 13.677V2.2233L38.1706 0.322754Z"
                      fill="white"
                    />
                    <path
                      d="M17.5181 12.6343L14.7766 10.1787C14.7766 10.1787 16.1221 9.32091 17.2994 7.85766L14.7766 7.94175L14.6084 5.18344L18.7795 5.31799C18.8972 4.99843 18.9813 4.66205 19.0486 4.30885L15.1971 4.5275V1.26462H23.3879C23.3879 8.73225 17.5181 12.6343 17.5181 12.6343ZM23.7075 0.322754H28.3121V13.677C27.6226 13.6434 26.9666 13.6266 26.4116 13.6266C25.3015 13.6266 24.5615 13.677 24.5615 13.677H24.4774V2.2233L23.7075 0.322754Z"
                      fill="white"
                    />
                    <path
                      d="M4.31874 12.096C1.87999 12.096 0.820393 11.1205 0.820393 9.11908V3.13152L0 1.26462H8.87669V4.10703L4.67194 3.97247V5.08253L8.89351 4.94797L8.72532 7.70629L4.67194 7.58856V8.19404C4.67194 8.7827 4.92423 8.83316 5.32788 8.83316C6.85841 8.83316 9.11215 8.66497 9.11215 8.66497L8.9776 12.096H4.31874ZM9.3308 0.322754H13.9355V13.677C11.8331 13.5761 10.1007 13.677 10.1007 13.677V2.2233L9.3308 0.322754Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M72.3995 0H69.5995V3.6201L67.0397 1.0603L65.0598 3.0402L67.6196 5.6H63.9995V8.4H67.6196L65.0598 10.9598L67.0397 12.9397L69.5995 10.3799V14H72.3995V10.3799L74.9593 12.9397L76.9392 10.9598L74.3794 8.4H77.9995V5.6H74.3794L76.9392 3.0402L74.9593 1.0603L72.3995 3.6201V0Z"
                      fill="#00CE72"
                    />
                  </svg>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: "600",
                      lineHeight: "24px",
                      color: COLORS.WHITE,
                    }}
                  >
                    답변 코칭
                  </Typography>
                </Box>
                {feed.bestAnswer ?? "답변 코칭 내용"}
              </Box>
            </Box>
          </Box>
        );
      })}
      <Box
        sx={{
          width: "100%",
          height: "104px",
          background: COLORS.DARK_BG,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "fixed",
          top: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            maxWidth: "1040px",
            width: "100%",
            gap: "16px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Typography
              sx={{
                color: COLORS.WHITE,
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "600",
                lineHeight: "18px",
              }}
            >
              {result.title} 면접 결과
            </Typography>
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.0337 15.9891V8.69626H13.2561V9.56988H13.332C13.522 9.19004 13.9121 8.6272 14.8514 8.6272C16.0772 8.6272 17.0371 9.58714 17.0371 11.3551C17.0371 13.0989 16.1014 14.0934 14.8548 14.0934C13.9398 14.0934 13.5289 13.5512 13.332 13.1645H13.2802V15.9891H12.0337ZM13.2561 11.3482C13.2561 12.3807 13.705 13.0747 14.5095 13.0747C15.3348 13.0747 15.7733 12.3461 15.7733 11.3482C15.7733 10.3572 15.3452 9.6493 14.5095 9.6493C13.6981 9.6493 13.2561 10.3157 13.2561 11.3482Z"
                fill="#B9B9B9"
              />
              <path
                d="M9.63135 14.0001V8.6962H10.8779V14.0001H9.63135ZM9.53467 7.26664C9.53467 6.89026 9.85925 6.58984 10.2564 6.58984C10.65 6.58984 10.978 6.89026 10.978 7.26664C10.978 7.63957 10.65 7.93998 10.2564 7.93998C9.85925 7.93998 9.53467 7.63957 9.53467 7.26664Z"
                fill="#B9B9B9"
              />
              <path
                d="M8.71494 8.69626V9.6562H7.67558V12.4048C7.67558 12.9159 7.92765 13.0195 8.24533 13.0264C8.39036 13.0298 8.63207 13.0126 8.79091 13.0022V14.0208C8.64243 14.045 8.40417 14.0726 8.08649 14.0726C7.15072 14.0726 6.42558 13.6099 6.43249 12.612V9.6562H5.67627V8.69626H6.43249V7.42554H7.67558V8.69626H8.71494Z"
                fill="#B9B9B9"
              />
              <circle
                cx="11"
                cy="11"
                r="10"
                stroke="#B9B9B9"
                strokeWidth="1.3"
              />
            </svg>
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: "34px",
              right: "27px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "5px",
                border: `1px solid ${COLORS.GRAY100}`,
                color: COLORS.GRAY100,
              }}
              onClick={() => {
                router.push("/history");
              }}
            >
              결과 재생성
            </Button>
            <Button
              sx={{
                display: "flex",
                padding: "8px 10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                borderRadius: "5px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={async () => {
                downloadMutation.mutate(Number(params.get("interviewId")));
                //window.open(downloadLink);
                // await axios({
                //   method: "GET",
                //   url:
                //     "https://tikitakachatdata.com/interview/downloadInterview?userId=" +
                //     userRecoilState.userId +
                //     "&interviewId=" +
                //     params.get("interviewId"),
                //   headers: {
                //     Authorization: `Bearer ${localStorage.getItem(
                //       "accessToken"
                //     )}`,
                //   },
                // }).then((res) => res.data);
              }}
            >
              내보내기
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default InterviewResultPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  max-width: 1040px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
`;

const Tags = styled.div`
  display: flex;
  gap: 8px;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  border-radius: 5px;
  background: ${COLORS.DARK_BG};
  color: ${COLORS.TIKI_GREEN};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
`;
