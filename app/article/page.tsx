"use client";

import styled from "@emotion/styled";
import Image from "next/image";
import { COLORS } from "@/style/color";
import dynamic from "next/dynamic";
import customAxios from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { modalStyle } from "@/style/modal";
import KakaoButton from "@/components/Element/Button/Kakao/KakaoButton";
import axios from "axios";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const ArticleDynamicView = dynamic(
  () => import("@/components/View/ArticleView/ArticleDynamicView"),
  {
    ssr: false,
  }
);

const ArticlePage = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const { user, setUser } = useUser();

  const [isSubscribed, setIsSubscribed] = useState(false);

  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.target = "_blank";
    link.click();
  };

  const { data, refetch } = useQuery({
    queryKey: ["resumes", user.userId],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/subscription/subscriptionCheck?userId=" + user.userId,
        data: {
          userId: user.userId,
        },
      }).then((res) => res.data);
    },
    enabled: isAuthenticated && !!user && !!user.userId,
  });

  const subscriptionMutation = useMutation({
    mutationFn: (userId: number) => {
      return customAxios({
        method: "POST",
        url: "/subscription/subscription",
        data: {
          userId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        handleOpen();
        refetch();
        setIsSubscribed(true);
      } else {
        toast.error("구독에 실패했어요. 다시 시도해 주세요.");
      }
    },
    onError: (error) => {
      toast.error("구독에 실패했어요. 다시 시도해 주세요.");
    },
  });

  const subscribe = async () => {
    const response = await axios({
      withCredentials: true,
      baseURL: "https://api.tikitaka.chat",
      method: "GET",
      url: `/user/getUserInfo`,
    })
      .then((res) => res.data ?? {})
      .catch((err) => err.response.data);

    if (response.code === "950") {
      handleOpen();
      setIsAuthenticated(false);
      setUser({
        email: "",
        profileImage: "",
        nickname: "",
        userId: null,
      });
      return;
    }

    setIsAuthenticated(true);
    setUser({
      email: response.data.email,
      profileImage: response.data.profileImage,
      nickname: response.data.nickname,
      userId: response.data.userId,
    });

    subscriptionMutation.mutate(response.data.userId);
  };

  useEffect(() => {
    if (data && data.code === "200") {
      setIsSubscribed(data.data.check);
    }
  }, [data]);

  return (
    <Container>
      <Box
        display={isAuthenticated ? (isSubscribed ? "none" : "block") : "block"}
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
          <SubscriptionButton onClick={subscribe}>
            아티클 구독하기
          </SubscriptionButton>
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

      <ArticleDynamicView viewAll={false} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isAuthenticated ? (
          <Box
            sx={{
              ...modalStyle,
              width: "fit-content !important",
              height: "auto",
              "@media (max-width: 768px)": {
                width: "fit-content !important",
                padding: "30px 20px",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "23px",
                color: COLORS.WHITE,
                fontWeight: 700,
                "@media (max-width: 1024px)": {
                  fontSize: "20px",
                },
              }}
            >
              축하드립니다! 🎉
            </Typography>
            <Typography
              sx={{
                color: COLORS.GRAY100,
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              티키타카의 센스있는 큐레이션을 <br />
              이제부터 받아보실 수 있어요.
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
              <svg
                width="312"
                height="100"
                viewBox="0 0 312 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="200.5"
                  y="50.5"
                  width="49"
                  height="49"
                  rx="4.5"
                  fill="#040404"
                  stroke="#B9B9B9"
                />
                <rect
                  x="206.875"
                  y="56.875"
                  width="36"
                  height="36"
                  rx="18"
                  fill="#00CE72"
                />
                <path
                  d="M225 75V56.875C220.009 56.875 215.458 58.9075 212.188 62.1875L225 75Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M225 75.001L225 75.0008H225L212.188 62.1887C208.908 65.4594 206.875 70.0099 206.875 75.0008M225 75.001L225 75.0012H225L212.22 87.7812C208.94 84.5105 206.875 79.9921 206.875 75.0012"
                  fill="#B2FFD1"
                />
                <path
                  d="M224.999 75V93.125C220.008 93.125 215.49 91.0604 212.219 87.7804L224.999 75Z"
                  fill="#6AFFBC"
                />
                <path
                  d="M225.001 75V93.125C229.992 93.125 234.51 91.0604 237.781 87.7804L225.001 75Z"
                  fill="#6AFFBC"
                />
                <rect x="212" width="50" height="50" rx="5" fill="white" />
                <rect
                  x="220"
                  y="21.6797"
                  width="24.8586"
                  height="6.3922"
                  fill="#040404"
                />
                <rect
                  x="239.434"
                  y="10.3164"
                  width="20.5971"
                  height="6.3922"
                  transform="rotate(45 239.434 10.3164)"
                  fill="#00CE72"
                />
                <rect
                  x="234.914"
                  y="34.9258"
                  width="20.5971"
                  height="6.3922"
                  transform="rotate(-45 234.914 34.9258)"
                  fill="#00CE72"
                />
                <rect
                  x="100.5"
                  y="50.5"
                  width="49"
                  height="49"
                  rx="4.5"
                  fill="#040404"
                  stroke="#B9B9B9"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M128.4 58H121.6V66.7917L115.383 60.575L110.575 65.3833L116.792 71.6H108V78.4H116.792L110.575 84.6166L115.383 89.425L121.6 83.2083V92H128.4V83.2083L134.617 89.425L139.425 84.6167L133.208 78.4H142V71.6H133.208L139.425 65.3833L134.617 60.575L128.4 66.7917V58Z"
                  fill="#00CE72"
                />
                <rect
                  x="250"
                  y="50.9414"
                  width="50"
                  height="50"
                  rx="5"
                  transform="rotate(-15 250 50.9414)"
                  fill="#00CE72"
                />
                <ellipse
                  cx="266.764"
                  cy="65.2123"
                  rx="10"
                  ry="5.625"
                  transform="rotate(-15 266.764 65.2123)"
                  fill="#040404"
                />
                <ellipse
                  cx="290.912"
                  cy="58.7436"
                  rx="10"
                  ry="5.625"
                  transform="rotate(-15 290.912 58.7436)"
                  fill="#040404"
                />
                <rect
                  x="271.875"
                  y="62.5508"
                  width="17.5"
                  height="2.5"
                  transform="rotate(-15 271.875 62.5508)"
                  fill="#040404"
                />
                <ellipse
                  cx="282.073"
                  cy="74.0496"
                  rx="3.125"
                  ry="3.125"
                  transform="rotate(-15 282.073 74.0496)"
                  fill="#040404"
                />
                <rect
                  x="150"
                  y="50"
                  width="50"
                  height="50"
                  rx="5"
                  fill="white"
                />
                <path
                  d="M175 95C186.046 95 195 86.0457 195 75C195 63.9543 186.046 55 175 55C163.954 55 155 63.9543 155 75C155 86.0457 163.954 95 175 95Z"
                  fill="#040404"
                />
                <path
                  d="M175 90C183.284 90 190 83.2843 190 75C190 66.7157 183.284 60 175 60C166.716 60 160 66.7157 160 75C160 83.2843 166.716 90 175 90Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M174.891 86.8867C181.518 86.8867 186.891 81.5141 186.891 74.8867C186.891 68.2593 181.518 62.8867 174.891 62.8867C168.263 62.8867 162.891 68.2593 162.891 74.8867C162.891 81.5141 168.263 86.8867 174.891 86.8867Z"
                  fill="#040404"
                />
                <path
                  d="M175 82C178.866 82 182 78.866 182 75C182 71.134 178.866 68 175 68C171.134 68 168 71.134 168 75C168 78.866 171.134 82 175 82Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M174.891 78.8867C177.1 78.8867 178.891 77.0959 178.891 74.8867C178.891 72.6776 177.1 70.8867 174.891 70.8867C172.681 70.8867 170.891 72.6776 170.891 74.8867C170.891 77.0959 172.681 78.8867 174.891 78.8867Z"
                  fill="#040404"
                />
                <path
                  d="M173.933 75.5316C173.481 75.0802 173.481 74.351 173.933 73.8996L180.12 67.7188L181.754 69.3508L175.567 75.5316C175.115 75.983 174.385 75.983 173.933 75.5316Z"
                  fill="#00CE72"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M184.816 62.4241C185.46 62.0638 186.28 62.1726 186.808 62.7003C187.266 63.1667 187.408 63.8386 187.203 64.428C187.37 64.4999 187.527 64.59 187.667 64.6974L189.007 65.725C189.591 66.1729 189.233 66.957 188.414 67.0258L185.297 67.2821C185.26 67.2849 185.223 67.2869 185.186 67.2879L181.483 72.3121C180.775 73.2809 179.37 73.3898 178.521 72.5407L176.974 70.995L176.964 70.9841C176.125 70.135 176.223 68.7308 177.192 68.0233L181.9 64.5561C181.895 64.4502 181.898 64.3431 181.909 64.2363L182.233 61.1257C182.32 60.3083 183.111 59.9676 183.546 60.5614L184.545 61.9238C184.655 62.0748 184.746 62.2437 184.816 62.4241Z"
                  fill="#00CE72"
                />
                <rect y="50" width="50" height="50" rx="5" fill="#00CE72" />
                <circle cx="37.0405" cy="69.1343" r="9.25926" fill="white" />
                <ellipse
                  cx="26.2351"
                  cy="85.1846"
                  rx="4.62963"
                  ry="6.17284"
                  fill="#040404"
                />
                <circle cx="16.0483" cy="69.1343" r="9.25926" fill="white" />
                <circle cx="39.505" cy="69.1378" r="6.79012" fill="#040404" />
                <circle cx="18.5167" cy="69.1378" r="6.79012" fill="#040404" />
              </svg>
            </Box>
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
                  fontSize: "16px",
                  display: "flex",
                  width: "300px",
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
                  handleClose();
                }}
              >
                감사합니다. 😃
              </Button>
            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              ...modalStyle,
              width: "fit-content !important",
              height: "auto",
              "@media (max-width: 768px)": {
                width: "fit-content !important",
                padding: "30px 20px",
              },
              "&:focus": {
                outline: "none",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: "23px",
                color: COLORS.WHITE,
                fontWeight: 700,
                "@media (max-width: 1024px)": {
                  fontSize: "20px",
                },
              }}
            >
              지금 로그인하고 소식을 받아보세요! ☺️
            </Typography>
            <Typography
              sx={{
                color: COLORS.GRAY100,
                textAlign: "center",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              로그인 하시면 티키타카의 센스있는 <br />
              큐레이션을 받아보실 수 있어요.
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
              <svg
                width="312"
                height="100"
                viewBox="0 0 312 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="200.5"
                  y="50.5"
                  width="49"
                  height="49"
                  rx="4.5"
                  fill="#040404"
                  stroke="#B9B9B9"
                />
                <rect
                  x="206.875"
                  y="56.875"
                  width="36"
                  height="36"
                  rx="18"
                  fill="#00CE72"
                />
                <path
                  d="M225 75V56.875C220.009 56.875 215.458 58.9075 212.188 62.1875L225 75Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M225 75.001L225 75.0008H225L212.188 62.1887C208.908 65.4594 206.875 70.0099 206.875 75.0008M225 75.001L225 75.0012H225L212.22 87.7812C208.94 84.5105 206.875 79.9921 206.875 75.0012"
                  fill="#B2FFD1"
                />
                <path
                  d="M224.999 75V93.125C220.008 93.125 215.49 91.0604 212.219 87.7804L224.999 75Z"
                  fill="#6AFFBC"
                />
                <path
                  d="M225.001 75V93.125C229.992 93.125 234.51 91.0604 237.781 87.7804L225.001 75Z"
                  fill="#6AFFBC"
                />
                <rect x="212" width="50" height="50" rx="5" fill="white" />
                <rect
                  x="220"
                  y="21.6797"
                  width="24.8586"
                  height="6.3922"
                  fill="#040404"
                />
                <rect
                  x="239.434"
                  y="10.3164"
                  width="20.5971"
                  height="6.3922"
                  transform="rotate(45 239.434 10.3164)"
                  fill="#00CE72"
                />
                <rect
                  x="234.914"
                  y="34.9258"
                  width="20.5971"
                  height="6.3922"
                  transform="rotate(-45 234.914 34.9258)"
                  fill="#00CE72"
                />
                <rect
                  x="100.5"
                  y="50.5"
                  width="49"
                  height="49"
                  rx="4.5"
                  fill="#040404"
                  stroke="#B9B9B9"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M128.4 58H121.6V66.7917L115.383 60.575L110.575 65.3833L116.792 71.6H108V78.4H116.792L110.575 84.6166L115.383 89.425L121.6 83.2083V92H128.4V83.2083L134.617 89.425L139.425 84.6167L133.208 78.4H142V71.6H133.208L139.425 65.3833L134.617 60.575L128.4 66.7917V58Z"
                  fill="#00CE72"
                />
                <rect
                  x="250"
                  y="50.9414"
                  width="50"
                  height="50"
                  rx="5"
                  transform="rotate(-15 250 50.9414)"
                  fill="#00CE72"
                />
                <ellipse
                  cx="266.764"
                  cy="65.2123"
                  rx="10"
                  ry="5.625"
                  transform="rotate(-15 266.764 65.2123)"
                  fill="#040404"
                />
                <ellipse
                  cx="290.912"
                  cy="58.7436"
                  rx="10"
                  ry="5.625"
                  transform="rotate(-15 290.912 58.7436)"
                  fill="#040404"
                />
                <rect
                  x="271.875"
                  y="62.5508"
                  width="17.5"
                  height="2.5"
                  transform="rotate(-15 271.875 62.5508)"
                  fill="#040404"
                />
                <ellipse
                  cx="282.073"
                  cy="74.0496"
                  rx="3.125"
                  ry="3.125"
                  transform="rotate(-15 282.073 74.0496)"
                  fill="#040404"
                />
                <rect
                  x="150"
                  y="50"
                  width="50"
                  height="50"
                  rx="5"
                  fill="white"
                />
                <path
                  d="M175 95C186.046 95 195 86.0457 195 75C195 63.9543 186.046 55 175 55C163.954 55 155 63.9543 155 75C155 86.0457 163.954 95 175 95Z"
                  fill="#040404"
                />
                <path
                  d="M175 90C183.284 90 190 83.2843 190 75C190 66.7157 183.284 60 175 60C166.716 60 160 66.7157 160 75C160 83.2843 166.716 90 175 90Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M174.891 86.8867C181.518 86.8867 186.891 81.5141 186.891 74.8867C186.891 68.2593 181.518 62.8867 174.891 62.8867C168.263 62.8867 162.891 68.2593 162.891 74.8867C162.891 81.5141 168.263 86.8867 174.891 86.8867Z"
                  fill="#040404"
                />
                <path
                  d="M175 82C178.866 82 182 78.866 182 75C182 71.134 178.866 68 175 68C171.134 68 168 71.134 168 75C168 78.866 171.134 82 175 82Z"
                  fill="#F2F2F2"
                />
                <path
                  d="M174.891 78.8867C177.1 78.8867 178.891 77.0959 178.891 74.8867C178.891 72.6776 177.1 70.8867 174.891 70.8867C172.681 70.8867 170.891 72.6776 170.891 74.8867C170.891 77.0959 172.681 78.8867 174.891 78.8867Z"
                  fill="#040404"
                />
                <path
                  d="M173.933 75.5316C173.481 75.0802 173.481 74.351 173.933 73.8996L180.12 67.7188L181.754 69.3508L175.567 75.5316C175.115 75.983 174.385 75.983 173.933 75.5316Z"
                  fill="#00CE72"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M184.816 62.4241C185.46 62.0638 186.28 62.1726 186.808 62.7003C187.266 63.1667 187.408 63.8386 187.203 64.428C187.37 64.4999 187.527 64.59 187.667 64.6974L189.007 65.725C189.591 66.1729 189.233 66.957 188.414 67.0258L185.297 67.2821C185.26 67.2849 185.223 67.2869 185.186 67.2879L181.483 72.3121C180.775 73.2809 179.37 73.3898 178.521 72.5407L176.974 70.995L176.964 70.9841C176.125 70.135 176.223 68.7308 177.192 68.0233L181.9 64.5561C181.895 64.4502 181.898 64.3431 181.909 64.2363L182.233 61.1257C182.32 60.3083 183.111 59.9676 183.546 60.5614L184.545 61.9238C184.655 62.0748 184.746 62.2437 184.816 62.4241Z"
                  fill="#00CE72"
                />
                <rect y="50" width="50" height="50" rx="5" fill="#00CE72" />
                <circle cx="37.0405" cy="69.1343" r="9.25926" fill="white" />
                <ellipse
                  cx="26.2351"
                  cy="85.1846"
                  rx="4.62963"
                  ry="6.17284"
                  fill="#040404"
                />
                <circle cx="16.0483" cy="69.1343" r="9.25926" fill="white" />
                <circle cx="39.505" cy="69.1378" r="6.79012" fill="#040404" />
                <circle cx="18.5167" cy="69.1378" r="6.79012" fill="#040404" />
              </svg>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: COLORS.GRAY100,
                  textAlign: "center",
                  fontSize: "10px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                티키타카{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    downloadFile(
                      "https://tikitaka.chat/terms/tikitaka_consent_to_collection_and_use_of_personal_information.pdf",
                      "tikitaka_consent_to_collection_and_use_of_personal_information.pdf"
                    );
                  }}
                >
                  개인정보 보호정책
                </span>
                ,{" "}
                <span
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    downloadFile(
                      "https://tikitaka.chat/terms/tikitaka_terms_of_use.pdf",
                      "tikitaka_terms_of_use.pdf"
                    );
                  }}
                >
                  이용약관
                </span>
                에 대한 내용을 확인하고 동의합니다.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                pt: "10px",
              }}
            >
              <KakaoButton destination={"/article"} />
            </Box>
          </Box>
        )}
      </Modal>
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

const SubscriptionButton = styled.button`
  padding: 18px 40px;
  border-radius: 8px;
  background-color: ${COLORS.TIKI_GREEN};
  color: ${COLORS.WHITE};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: fit-content;
  line-height: 16px;

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
