"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import Surprised from "@/public/svg/surprised.svg";
import ExclamationMark from "@/public/svg/exclamation-mark.svg";
import Timer from "@/public/svg/timer.svg";
import Target from "@/public/svg/target.svg";
import WhiteDocument from "@/public/svg/white-document.svg";
import Question from "@/public/svg/question.svg";
import BlackLogo from "@/public/svg/black-logo.svg";
import RightArrow from "@/public/svg/right-arrow.svg";
import Sunglasses from "@/public/svg/sunglasses.svg";
import SurprisedMobile from "@/public/svg/surprised-mobile.svg";
import ExclamationMarkMobile from "@/public/svg/exclamation-mark-mobile.svg";
import TimerMobile from "@/public/svg/timer-mobile.svg";
import TargetMobile from "@/public/svg/target-mobile.svg";
import WhiteDocumentMobile from "@/public/svg/white-document-mobile.svg";
import QuestionMobile from "@/public/svg/question-mobile.svg";
import BlackLogoMobile from "@/public/svg/black-logo-mobile.svg";
import RightArrowMobile from "@/public/svg/right-arrow-mobile.svg";
import SunglassesMobile from "@/public/svg/sunglasses-mobile.svg";
import { useRouter } from "next/navigation";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { Header } from "@/components/Layout";
import { useState } from "react";
import { bottomModalStyle, modalStyle } from "@/style/modal";
import Image from "next/image";
import BackgroundVideo from "@/components/Element/BackgroundVideo";
import ArticleView from "@/components/View/ArticleView";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason === "backdropClick") return;
    if (reason === "escapeKeyDown") return;
    setOpen(false);
  };

  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <Main>
      <Header />
      <BackgroundVideo />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          overflowY: "hidden",
          // 바 숨기기
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          marginTop: "100px",
          "@media screen and (max-width: 1024px)": {
            marginTop: "0px",
          },
        }}
      >
        <Wrapper>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              // 1640px 이상
              "@media screen and (min-width: 1640px)": {
                gap: "170px",
              },
              // 1280px 이상
              "@media screen and (max-width: 1640px)": {
                gap: "84px",
              },
              // 1024px 이상
              "@media screen and (max-width: 1280px)": {
                gap: "76px",
              },
              // 그 이하
              "@media screen and (max-width: 1024px)": {
                gap: "70px",
              },
            }}
          >
            {/* 메인 써클 */}
            <Box
              sx={{
                width: "540px",
                height: "540px",
                flexShrink: 0,
                borderRadius: "540px",
                background:
                  "linear-gradient(235deg, #2B2B2B 15.46%, #121212 90.24%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "40px",
                "@media screen and (max-width: 1024px)": {
                  width: "300px",
                  height: "300px",
                  borderRadius: "300px",
                },
              }}
            >
              <Typography
                sx={{
                  textAlign: " center",
                  fontSize: " 36px",
                  fontStyle: " normal",
                  fontWeight: " 700",
                  lineHeight: " 54px",
                  color: COLORS.WHITE,
                  position: "relative",
                  "@media screen and (max-width: 1024px)": {
                    fontSize: "24px",
                    lineHeight: "36px",
                  },
                }}
              >
                면접부터 합격까지 <br />
                AI 면접 코칭, 티키타카
                <svg
                  width="81"
                  height="56"
                  viewBox="0 0 81 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-0 left-[25px] max-[1024px]:left-[0px] max-[1024px]:top-[-10px] max-[1024px]:scale-[0.7]"
                >
                  <path
                    d="M65.2064 55.6585C65.8351 54.7485 66.476 53.8503 67.0885 52.9269C69.1382 49.8375 68.4297 50.6472 70.4591 47.5414C68.1539 47.8175 66.1069 48.0699 64.0585 48.306C56.2329 49.2071 48.4208 50.2938 40.579 50.9486C32.4775 51.6255 24.3923 51.2351 16.4707 48.9221C13.7422 48.1249 11.072 47.1272 8.67885 45.4763C7.12129 44.4015 5.56374 43.2094 4.29552 41.7634C0.146101 37.0335 -1.04234 31.4559 0.927582 25.1968C2.64332 19.7424 5.75032 15.3347 9.70775 11.6173C14.421 7.1902 19.936 4.49418 25.8755 2.78393C34.9977 0.156204 44.2511 -0.709313 53.6275 0.609005C59.4264 1.42405 64.9576 3.24564 69.9778 6.61715C71.6962 7.77216 73.3498 9.08751 74.8816 10.5246C80.0965 15.4208 82.015 21.6368 80.494 28.9781C79.8856 31.9101 79.0513 34.8244 77.9967 37.5976C75.6969 43.6473 74.2218 46.3182 70.6173 51.5529C69.4343 53.2691 70.0265 52.382 68.6744 53.9453C67.8267 54.9251 66.7978 55.6882 65.5661 56C65.4471 55.8857 65.3281 55.7714 65.2091 55.6571L65.2064 55.6585ZM38.2291 49.2502C41.5308 48.9384 47.3567 48.4366 53.1746 47.8265C58.9938 47.2163 64.8008 46.4844 70.6173 45.849C71.2365 45.7807 71.6611 45.6337 71.972 45.0072C74.6518 39.63 77.0449 34.1341 78.1887 28.071C79.3907 21.6991 77.8304 16.316 73.3809 12.0448C71.7828 10.5112 70.0197 9.13799 68.1985 7.93844C64.5466 5.53488 60.5392 4.07107 56.3654 3.23228C45.1137 0.971245 34.0729 2.04461 23.2674 6.05004C17.8687 8.05126 13.0581 11.2016 8.99928 15.636C6.21813 18.675 3.93453 22.1059 2.65144 26.2197C1.19664 30.8828 1.75368 35.2148 4.63488 39.103C6.10996 41.0938 7.81759 42.813 9.91732 43.9175C11.9373 44.979 14.0194 45.9618 16.1583 46.6744C22.5184 48.7944 29.0879 49.1849 38.2291 49.2531V49.2502Z"
                    fill="#B2FFD1"
                  />
                </svg>
                <svg
                  width="36"
                  height="35"
                  viewBox="0 0 36 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-[-20px] right-[10px] max-[1024px]:right-[0px] max-[1024px]:scale-[0.7]"
                >
                  <g clipPath="url(#clip0_574_3345)">
                    <path
                      d="M25.6795 10.7504C28.3081 10.004 30.8088 9.29334 33.3115 8.58582C33.7582 8.45985 34.206 8.2898 34.662 8.24886C35.5842 8.16488 36.2094 8.87974 35.934 9.77621C35.7297 10.4396 35.3944 11.0947 34.9869 11.6552C33.4384 13.7841 31.8745 15.9035 30.2352 17.9599C29.6554 18.6873 29.577 19.2794 29.9102 20.1349C30.7304 22.2438 31.4474 24.3947 32.1984 26.5309C32.9329 28.622 31.8972 30.058 29.7111 29.8271C28.664 29.7168 27.6386 29.3337 26.6234 29.0104C25.9168 28.7847 25.239 28.4593 24.555 28.1632C23.9185 27.8882 23.2902 27.5922 22.5763 27.2689C21.912 27.99 21.2899 28.6839 20.6472 29.3578C19.2545 30.8169 17.869 32.2845 16.4432 33.71C15.7211 34.4322 14.9649 35.3213 13.7992 34.8846C12.5364 34.4112 12.5725 33.1547 12.6118 32.0997C12.6922 29.9299 12.9212 27.7654 13.1049 25.6008C13.1678 24.8545 13.2803 24.1123 13.3793 23.2862C12.6097 23.0017 11.9216 22.7403 11.2283 22.4916C9.65095 21.9258 8.05295 21.4135 6.50033 20.7826C5.74621 20.4761 5.09937 20.496 4.36175 20.7847C3.32289 21.1909 2.24793 21.5038 1.18328 21.8418C0.698408 21.9961 0.223855 21.9845 0.0381605 21.3988C-0.123806 20.8876 0.231077 20.5978 0.63032 20.4162C1.3896 20.0698 2.16436 19.7591 3.03713 19.3886C2.82049 19.0631 2.62344 18.8217 2.48623 18.5477C2.15198 17.8791 2.25618 17.2692 2.83286 16.9395C3.34043 16.6509 3.76237 16.443 4.37826 17.1044C5.05088 17.8276 6.10212 18.1593 7.18328 17.7174C9.55501 16.7474 11.9267 15.7765 14.3129 14.8453C14.9185 14.6092 15.1496 14.204 15.2868 13.6035C16.1482 9.8266 17.0344 6.05493 17.9216 2.28431C18.0505 1.73425 18.1681 1.1674 18.3982 0.658283C18.7397 -0.0975206 19.4133 -0.220339 19.9663 0.388503C20.3697 0.832538 20.6802 1.37945 20.967 1.91586C22.2999 4.40896 23.61 6.91466 24.9316 9.41406C25.1503 9.8266 25.3865 10.2297 25.6785 10.7514L25.6795 10.7504ZM24.6912 12.7301C21.881 13.8009 19.2792 14.7803 16.6919 15.7995C16.436 15.9003 16.141 16.2152 16.0884 16.4777C15.8078 17.8948 15.5983 19.3277 15.3662 20.7448C17.8566 21.8229 20.1902 22.8327 22.6248 23.8877C24.0588 22.2144 25.4721 20.5968 26.8339 18.9361C27.0217 18.7073 27.097 18.2034 26.9835 17.9305C26.2861 16.2446 25.5196 14.5871 24.6912 12.7301ZM23.9463 11.3172C22.4113 8.20267 20.9556 5.25189 19.501 2.30006C18.26 6.10952 17.2593 9.85284 16.5959 13.9037C19.1152 13.0178 21.4188 12.2063 23.9463 11.3172ZM14.7421 31.4772C16.7631 29.8743 18.5364 28.1401 20.4037 26.1792C18.4962 25.3542 16.8167 24.6288 15.0196 23.851C14.6193 26.5036 14.4285 28.9568 14.7421 31.4772ZM33.5313 10.4081C33.4653 10.3116 33.3992 10.215 33.3322 10.1184C31.0584 10.7934 28.7858 11.4694 26.38 12.1832C27.1609 13.7757 27.848 15.1739 28.6258 16.7611C30.3703 14.501 31.9508 12.4541 33.5313 10.4081ZM24.8057 24.738C26.184 25.7184 28.3401 26.533 29.6884 26.5687C29.3098 24.6477 28.8446 22.7981 28.0481 20.8267C26.8669 22.2512 25.8404 23.4898 24.8057 24.738ZM13.9157 20.2619C14.1396 19.0778 14.3428 17.9966 14.6049 16.6089C12.7799 17.3657 11.2252 18.0113 9.67055 18.6559C9.68396 18.743 9.69841 18.8291 9.71182 18.9162C11.0241 19.3361 12.3363 19.756 13.9157 20.2609V20.2619Z"
                      fill="#B2FFD1"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_574_3345">
                      <rect width="36" height="35" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <svg
                  width="135"
                  height="29"
                  viewBox="0 0 135 29"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute bottom-[-10px] right-[-15px] max-[1024px]:bottom-[-15px] max-[1024px]:right-[-25px] max-[1024px]:scale-[0.7]"
                >
                  <g clipPath="url(#clip0_574_3341)">
                    <path
                      d="M2.13553 16.5996C35.9941 11.2074 70.1135 8.16998 104.417 8.53386C114.178 8.63667 123.913 8.93705 133.67 9.28897C134.723 9.32711 134.783 7.77822 133.751 7.66546C116.384 5.76831 98.7502 5.29497 81.2943 5.75482C64.1406 6.20725 47.0011 7.55956 29.994 9.85123C20.5109 11.1292 11.0716 12.7063 1.71483 14.7076C0.488407 14.9689 0.91229 16.7967 2.13539 16.6024L2.13553 16.5996Z"
                      fill="#B2FFD1"
                    />
                    <path
                      d="M16.4414 22.275C30.0254 20.2254 43.582 18.1633 57.2614 16.8412C71.1711 15.4969 85.1401 14.8755 99.1135 14.7276C107.089 14.6439 115.078 14.8017 123.048 14.6084C123.521 14.5983 123.554 13.9332 123.084 13.8763C116.078 13.0137 108.982 12.8469 101.93 12.6739C94.8872 12.5013 87.8222 12.717 80.7855 13.0378C66.8889 13.6656 52.9811 14.8587 39.2207 16.9135C31.5025 18.0661 23.793 19.3815 16.2012 21.1986C15.5079 21.3659 15.7457 22.3778 16.4414 22.275Z"
                      fill="#B2FFD1"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_574_3341">
                      <rect
                        width="133"
                        height="21"
                        fill="white"
                        transform="translate(1.72461 0.533813) rotate(2.83725)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </Typography>
              <MainButton
                onClick={() => {
                  router.push("/interview");
                }}
              >
                티키타카 하러가기
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6724 12.0007L8.72266 7.05093L10.1369 5.63672L16.5008 12.0007L10.1369 18.3646L8.72266 16.9504L13.6724 12.0007Z"
                    fill="white"
                  />
                </svg>
              </MainButton>
            </Box>
            {/* 서브 디스크립션 */}
            <SubWrapper>
              <Box
                sx={{
                  minWidth: "350px",
                  width: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "30px",
                  "@media (max-width: 1280px)": {
                    gap: "24px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Surprised />
                  <ExclamationMark />
                  <Timer />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Typography
                    fontSize={24}
                    color={COLORS.WHITE}
                    textAlign="center"
                    fontWeight={700}
                    lineHeight={"36px"}
                    sx={{
                      "@media (max-width: 1280px)": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    면접 준비가 끝나는 시간 단 1분
                  </Typography>
                  <Typography
                    fontSize={16}
                    color={COLORS.GRAY100}
                    textAlign="center"
                    fontWeight={400}
                    lineHeight={"24px"}
                  >
                    이력서와 채용 공고만 넣으면 준비 끝!
                    <br />
                    나머지는 티키타카에게 맡기세요
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  minWidth: "350px",
                  width: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "30px",
                  "@media (max-width: 1280px)": {
                    gap: "24px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Target />
                  <WhiteDocument />
                  <Question />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Typography
                    fontSize={24}
                    color={COLORS.WHITE}
                    textAlign="center"
                    fontWeight={700}
                    lineHeight={"36px"}
                    sx={{
                      "@media (max-width: 1280px)": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    환상의 면접 케미를 위한 맞춤형 질문
                  </Typography>
                  <Typography
                    fontSize={16}
                    color={COLORS.GRAY100}
                    textAlign="center"
                    fontWeight={400}
                    lineHeight={"24px"}
                  >
                    직무 경험, 지원하는 회사, 직무 정보로
                    <br />
                    면접 적중 예상 질문을 제공해요
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  minWidth: "350px",
                  width: "350px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "30px",
                  "@media (max-width: 1280px)": {
                    gap: "24px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <BlackLogo />
                  <RightArrow />
                  <Sunglasses />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <Typography
                    fontSize={24}
                    color={COLORS.WHITE}
                    textAlign="center"
                    fontWeight={700}
                    lineHeight={"36px"}
                    sx={{
                      "@media (max-width: 1280px)": {
                        fontSize: "20px",
                      },
                    }}
                  >
                    AI가 알려주는 면접관의 속마음
                  </Typography>
                  <Typography
                    fontSize={16}
                    color={COLORS.GRAY100}
                    textAlign="center"
                    fontWeight={400}
                    lineHeight={"24px"}
                  >
                    면접이 끝나면 면접관의 속마음과
                    <br />
                    면접관을 사로잡을 답변을 알려줘요
                  </Typography>
                </Box>
              </Box>
            </SubWrapper>
            {/* 스와이퍼 */}
            <SwiperWrapper>
              <Swiper
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                pagination={true}
                className="mainSwiper"
                centerInsufficientSlides={true}
                centeredSlidesBounds={true}
                centeredSlides={true}
              >
                <SwiperSlide>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <SurprisedMobile />
                      <ExclamationMarkMobile />
                      <TimerMobile />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        fontSize={20}
                        color={COLORS.WHITE}
                        textAlign="center"
                        fontWeight={700}
                        lineHeight={"36px"}
                      >
                        면접 준비가 끝나는 시간 단 1분
                      </Typography>
                      <Typography
                        fontSize={16}
                        color={COLORS.GRAY100}
                        textAlign="center"
                        fontWeight={400}
                        lineHeight={"24px"}
                      >
                        이력서와 채용 공고만 넣으면 준비 끝!
                        <br />
                        나머지는 티키타카에게 맡기세요
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <TargetMobile />
                      <WhiteDocumentMobile />
                      <QuestionMobile />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        fontSize={20}
                        color={COLORS.WHITE}
                        textAlign="center"
                        fontWeight={700}
                        lineHeight={"36px"}
                      >
                        환상의 면접 케미를 위한 맞춤형 질문
                      </Typography>
                      <Typography
                        fontSize={16}
                        color={COLORS.GRAY100}
                        textAlign="center"
                        fontWeight={400}
                        lineHeight={"24px"}
                      >
                        직무 경험, 지원하는 회사, 직무 정보로
                        <br />
                        면접 적중 예상 질문을 제공해요
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
                <SwiperSlide>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <BlackLogoMobile />
                      <RightArrowMobile />
                      <SunglassesMobile />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        gap: "6px",
                      }}
                    >
                      <Typography
                        fontSize={20}
                        color={COLORS.WHITE}
                        textAlign="center"
                        fontWeight={700}
                        lineHeight={"36px"}
                      >
                        AI가 알려주는 면접관의 속마음
                      </Typography>
                      <Typography
                        fontSize={16}
                        color={COLORS.GRAY100}
                        textAlign="center"
                        fontWeight={400}
                        lineHeight={"24px"}
                      >
                        면접이 끝나면 면접관의 속마음과
                        <br />
                        면접관을 사로잡을 답변을 알려줘요
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              </Swiper>
            </SwiperWrapper>
          </Box>
          {/* 취업 아티클 */}
          <ArticleView viewAll={true} />
          {/* 부가 정보 */}
          <Box
            sx={{
              display: "none",
              color: COLORS.WHITE,
              "@media (max-width: 1024px)": {
                display: "block",
              },
            }}
          >
            <Box
              display={"flex"}
              alignItems={"center"}
              gap={"6px"}
              marginBottom={"6px"}
            >
              <Typography
                fontSize={11}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_terms_of_use.pdf",
                    "tikitaka_terms_of_use.pdf"
                  );
                }}
              >
                이용약관
              </Typography>
              <Typography fontSize={11} color={COLORS.GRAY200}>
                |
              </Typography>
              <Typography
                fontSize={11}
                fontWeight={700}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_consent_to_collection_and_use_of_personal_information.pdf",
                    "tikitaka_consent_to_collection_and_use_of_personal_information.pdf"
                  );
                }}
              >
                개인정보처리방침
              </Typography>
            </Box>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              사업자 등록번호 : 225-52-00817
            </Typography>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              대표 : 정진협 |{" "}
              <Link
                href={"http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2255200817"}
                style={{ color: COLORS.TIKI_GREEN }}
                target="_blank"
                className="cursor-pointer hover:text-white underline"
              >
                사업자정보확인
              </Link>
            </Typography>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              서울특별시 서초구 사평대로26길 62, 301호(반포동 삼익아트빌라)
            </Typography>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              통신판매업 신고번호 : 2023-서울서초-3908
            </Typography>
            <Typography fontSize={12} color={COLORS.GRAY200}>
              개인정보보호책임자 : 정진협
            </Typography>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              marginTop={"20px"}
            >
              <Typography fontSize={12} color={COLORS.GRAY200}>
                스톤즈랩
              </Typography>
              <Typography fontSize={12} color={COLORS.GRAY200}>
                <Link
                  href={"mailto:chat.tikitaka@gmail.com"}
                  className="cursor-pointer hover:text-white"
                >
                  chat.tikitaka
                  <span style={{ color: COLORS.TIKI_GREEN }}>@</span>
                  gmail.com
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            position={"relative"}
            bottom={0}
            width={"100%"}
            paddingRight={"30px"}
            paddingBottom={"20px"}
            sx={{
              "@media (max-width: 1024px)": {
                display: "none",
              },
            }}
          >
            <Box
              sx={{
                display: "none",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "13px",
                gap: "13px",
                "@media (max-width: 1640px)": {
                  display: "flex",
                  color: COLORS.WHITE,
                },
                "@media (max-width: 1025px)": {
                  gap: "20px",
                },
              }}
            >
              <Box display={"flex"} alignItems={"center"} gap={"6px"}>
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.00065 15.1666C7.02572 15.1666 8.66732 13.525 8.66732 11.5C8.66732 9.47491 7.02572 7.83331 5.00065 7.83331C2.9756 7.83331 1.33398 9.47491 1.33398 11.5C1.33398 12.1678 1.51254 12.794 1.82452 13.3333L1.51732 14.9833L3.16732 14.6761C3.70664 14.9881 4.33279 15.1666 5.00065 15.1666Z"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.1881 12.4318C10.839 12.327 11.4504 12.1043 11.9999 11.7864L14.3999 12.2333L13.953 9.83331C14.4068 9.04885 14.6665 8.13805 14.6665 7.16665C14.6665 4.22113 12.2787 1.83331 9.33321 1.83331C6.64829 1.83331 4.42676 3.8173 4.05469 6.39921"
                    stroke="white"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Typography fontSize={12} color={COLORS.GRAY200}>
                  <Link
                    href={"https://open.kakao.com/o/sUonPQYf"}
                    className="cursor-pointer hover:text-white"
                    target="_blank"
                  >
                    고객센터
                  </Link>
                </Typography>
              </Box>
              <Typography fontSize={12} color={COLORS.GRAY200}>
                스톤즈랩
              </Typography>
              <Typography fontSize={12} color={COLORS.GRAY200}>
                <Link
                  href={"mailto:chat.tikitaka@gmail.com"}
                  className="cursor-pointer hover:text-white"
                >
                  chat.tikitaka
                  <span style={{ color: COLORS.TIKI_GREEN }}>@</span>
                  gmail.com
                </Link>
              </Typography>
              <Box display={"flex"} alignItems={"center"} gap={"6px"}>
                <Typography
                  fontSize={11}
                  color={COLORS.GRAY200}
                  className="cursor-pointer hover:text-white"
                  onClick={() => {
                    downloadFile(
                      "https://tikitaka.chat/terms/tikitaka_terms_of_use.pdf",
                      "tikitaka_terms_of_use.pdf"
                    );
                  }}
                >
                  이용약관
                </Typography>
                <Typography fontSize={11} color={COLORS.GRAY200}>
                  |
                </Typography>
                <Typography
                  fontSize={11}
                  fontWeight={700}
                  color={COLORS.GRAY200}
                  className="cursor-pointer hover:text-white"
                  onClick={() => {
                    downloadFile(
                      "https://tikitaka.chat/terms/tikitaka_consent_to_collection_and_use_of_personal_information.pdf",
                      "tikitaka_consent_to_collection_and_use_of_personal_information.pdf"
                    );
                  }}
                >
                  개인정보처리방침
                </Typography>
              </Box>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              gap={"30px"}
              sx={{
                "@media (max-width: 1640px)": {
                  justifyContent: "center",
                  gap: "0px",
                },
                "@media (max-width: 1280px)": {
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "0px",
                },
              }}
            >
              <Box display={"flex"} justifyContent={"center"} gap={"30px"}>
                <Typography fontSize={12} color={COLORS.GRAY400}>
                  사업자 등록번호 : 225-52-00817
                </Typography>
                <Typography fontSize={12} color={COLORS.GRAY400}>
                  대표 : 정진협 |{" "}
                  <Link
                    href={
                      "http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2255200817"
                    }
                    style={{ color: COLORS.TIKI_GREEN }}
                    target="_blank"
                    className="cursor-pointer hover:text-white underline"
                  >
                    사업자정보확인
                  </Link>
                </Typography>
                <Typography fontSize={12} color={COLORS.GRAY400}>
                  서울특별시 서초구 사평대로26길 62, 301호(반포동 삼익아트빌라)
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"center"} gap={"30px"}>
                <Typography fontSize={12} color={COLORS.GRAY400}>
                  통신판매업 신고번호 : 2023-서울서초-3908
                </Typography>
                <Typography fontSize={12} color={COLORS.GRAY400}>
                  개인정보보호책임자 : 정진협
                </Typography>
              </Box>
            </Box>
          </Box>
        </Wrapper>
      </Box>
      <ScreenHeightWrapper>
        <BottomButton
          onClick={() => {
            router.push("/interview");
          }}
        >
          티키타카 하러가기
        </BottomButton>
      </ScreenHeightWrapper>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...modalStyle,
            padding: "30px 30px 36px 30px",
            width: "fit-content",
            "@media (max-width: 1024px)": {
              width: "353px",
              padding: "20px",
            },

            "@media (max-width: 768px)": {
              // 여기서 부터는 bottomSheetStyle
              ...bottomModalStyle,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              onClick={() => {
                setOpen(false);
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"
                  fill="#B9B9B9"
                />
              </svg>
            </Box>
            <Typography
              sx={{
                fontSize: "23px",
                color: COLORS.WHITE,
                fontWeight: 700,
                textAlign: "center",

                "@media (max-width: 1024px)": {
                  fontSize: "20px",
                },
              }}
            >
              면접 시뮬레이션과 <br /> 피드백 서비스를 오픈했어요 🥳
            </Typography>
          </Box>
          <Typography
            sx={{
              color: COLORS.GRAY100,
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",

              "@media (max-width: 1024px)": {
                fontSize: "16px",
              },
            }}
          >
            실제 기업 정보를 학습한 AI 면접관 티키와 <br /> 모의 면접을 보고,
            피드백을 받을 수 있어요.
          </Typography>
          <Box
            sx={{
              backgroundColor: "#1D1D1D",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              padding: "16px",
              borderRadius: "20px",

              "@media (max-width: 1024px)": {
                padding: "10px",
                gap: "10px",
              },

              "@media (max-width: 768px)": {
                maxWidth: "320px",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Image
                src={"/assets/interviewing.png"}
                alt=""
                priority
                width={200}
                height={310}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <Image
                src={"/assets/thankyou.png"}
                alt=""
                priority
                width={200}
                height={310}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",

              "@media (max-width: 768px)": {
                pt: "14px",
              },
            }}
          >
            <Button
              sx={{
                fontSize: "16px",
                display: "flex",
                width: "330px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
                fontWeight: "bold",
                height: "56px",
              }}
              onClick={async () => {
                router.push("/interview");
              }}
            >
              지금 바로 시작해볼까요?
              <svg
                width="9"
                height="14"
                viewBox="0 0 9 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.67146 7.0007L0.72168 2.05093L2.1359 0.636719L8.49986 7.0007L2.1359 13.3646L0.72168 11.9504L5.67146 7.0007Z"
                  fill="white"
                />
              </svg>
            </Button>
          </Box>
        </Box>
      </Modal>
    </Main>
  );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 350px;
  overflow: hidden;
  // background: radial-gradient(
  //     137.47% 43.57% at 50% 50%,
  //     rgba(0, 0, 0, 0) 0%,
  //     rgba(0, 0, 0, 0.2) 100%
  //   ),
  //   linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
  //   linear-gradient(187deg, rgba(0, 0, 0, 0) 56.14%, #000 72.48%, #000 98.3%),
  //   url("/svg/main-bg.svg");),
  //   lightgray 1.123px -839.09px / 100.158% 53.767% no-repeat, #000;
  // background-blend-mode: normal, normal, normal, normal, normal;
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: cover;
  height: calc(var(--vh, 1vh) * 100);
  position: relative;

  @media (max-width: 768px) {
    // background: url("/svg/main-mobile-bg.svg");), lightgray 50% / cover no-repeat;
    // background-blend-mode: normal, normal;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: cover;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  &::-webkit-scrollbar {
    display: none !important;
  }

  @media (max-width: 1024px) {
    padding-top: 130px;
    padding-bottom: 130px;
    justify-content: flex-start;
    gap: 66px;
  }
  @media (min-width: 1025px) {
    gap: 70px;
  }
  @media (min-width: 1640px) {
    gap: 56px;
  }
`;

const MainButton = styled.button`
  display: flex;
  width: 330px;
  padding: 18px 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 5px;
  background: linear-gradient(270deg, #04e580 0.14%, #00aa5e 97.77%);
  color: ${COLORS.WHITE};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 18px;
  font-weight: bold;

  &:hover {
    background: linear-gradient(270deg, #04e280 0.14%, #00ca5e 97.77%);
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const BottomButton = styled.button`
  display: flex;
  width: 353px;
  height: 52px;
  padding: 18px 10px;
  justify-content: center;
  align-items: center;
  gap: 2px;
  border-radius: 5px;
  background: linear-gradient(270deg, #04e580 0.14%, #00aa5e 97.77%);
  color: ${COLORS.WHITE};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;

  &:hover {
    background: linear-gradient(270deg, #04e280 0.14%, #00ca5e 97.77%);
  }
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;

  @media (max-width: 1640px) {
    gap: 30px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

const SwiperWrapper = styled.div`
  display: none;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 350px;
  }

  .mainSwiper {
    height: 200px;
  }

  .swiper-pagination-bullet {
    background-color: ${COLORS.GRAY400};
  }
`;

const ScreenHeightWrapper = styled.div`
  display: none;
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: transparent;
  z-index: 999;

  @media (max-width: 1024px) {
    display: flex;
    justify-content: center;
  }
`;
