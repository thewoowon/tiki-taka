"use client";

import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "@/lib/axios";
import { modalStyle } from "@/style/modal";

const Profile = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRecoilState, setUserRecoilState] = useRecoilState(userState);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["resumes", userRecoilState.userId],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/subscription/subscriptionCheck?userId=" + userRecoilState.userId,
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
  });

  const cancelMutation = useMutation({
    mutationFn: () =>
      customAxios({
        method: "DELETE",
        url: "/subscription/subscriptionCancel",
        data: {
          userId: userRecoilState.userId,
        },
      })
        .then((res) => res.data)
        .catch((err) => {
          toast.error("구독을 취소하는 중 오류가 발생했습니다.");
          router.push("/auth/kakao");
        }),
    onSuccess: (data) => {
      if (data.code === "200") {
        toast.success("구독이 취소되었습니다.");
        refetch();
      } else {
        toast.error("구독을 취소하는 중 오류가 발생했습니다.");
      }
    },
  });

  useEffect(() => {
    if (data && data.code === "200") {
      setIsSubscribed(data.data.check);
    }
  }
    , [data]);

  if (isLoading)
    return (
      <Container isLoading={isLoading}>
        <CircularProgress
          size={18}
          sx={{
            color: COLORS.WHITE,
          }}
        />
      </Container>
    );

  return (
    <Container>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          justifyContent: "center",
          alignItems: "flex-start",
          "@media (max-width: 1024px)": {
            alignItems: "center",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 500,
            color: COLORS.WHITE,
            lineHeight: "24px",
            textAlign: "center",
          }}
        >
          {userRecoilState.email}
        </Typography>
      </Box>
      <Button
        sx={{
          display: "flex",
          padding: "6px 8px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
          border: "1px solid " + COLORS.GRAY100,
          color: COLORS.GRAY100,

          "&:disabled": {
            color: COLORS.WHITE,
          },
        }}
        onClick={() => {
          if (isSubscribed) {
            handleOpen();
          }
        }}
        disabled={!isSubscribed}
      >
        {cancelMutation.isPending ? (
          <CircularProgress
            size={18}
            sx={{
              color: COLORS.WHITE,
            }}
          />
        ) : (
          isSubscribed ? "구독취소" :
            "구독가능"
        )}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
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
        }}>
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
            진심이신가요? 🥲
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
            티키타카의 큐레이션이 마음에 들지 않으셨군요...
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
            다음 큐레이션에는 정말 마음에 드는 컨텐츠를 <br />
            준비해보려고 하는데 이번 한번만 참아보시겠어요?
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              pt: "20px",
              flexDirection: "column",
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
              참는다
            </Button>
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
                backgroundColor: COLORS.GRAY400 + " !important",
                color: COLORS.TIKI_BLACK,
                fontWeight: "bold",
                height: "56px",
              }}
              onClick={async () => {
                cancelMutation.mutate();
                handleClose();
              }}
            >
              구독을 취소한다
            </Button>
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
                backgroundColor: COLORS.TIKI_BLACK + " !important",
                color: COLORS.WHITE,
                fontWeight: "bold",
                height: "56px",
              }}
              onClick={async () => {
                toast.success("준비중인 기능입니다.");
                handleClose();
              }}
            >
              보고싶은 컨텐츠 요청
            </Button>
          </Box>
        </Box>

      </Modal>
    </Container>
  );
};

export default Profile;

const Container = styled.main<{
  isLoading?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1040px;
  width: 100%;
  padding: 40px;
  justify-content: ${(props) => (props.isLoading ? "center" : "flex-start")};
  align-items: center;
  border-radius: 5px;
  background: ${COLORS.DARK_BG};
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 30px 20px;
  }
`;
