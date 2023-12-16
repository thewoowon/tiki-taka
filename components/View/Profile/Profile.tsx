"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { loginState, userState } from "@/states";
import { useMe } from "@/hooks/useMe";
import axios from "axios";
import toast from "react-hot-toast";
import { Loading } from "../Loading";
import { SimulationQLoading } from "@/components/Element/Loading";
import { useMutation } from "@tanstack/react-query";

const Profile = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [myImage, setMyImage] = useState<File | null>(null);
  const [myProfileUrl, setMyProfileUrl] = useState("/assets/black-logo.png");
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [userRecoilState, setUserRecoilState] = useRecoilState(userState);
  const { isLoading, nickname } = useMe();

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setMyProfileUrl(reader.result?.toString() || "");
        resolve();
      };
    });
  };

  const logoutMutation = useMutation({
    mutationFn: () =>
      axios({
        method: "POST",
        url: "https://tikitakachatdata.com/user/logout",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
        },
      })
        .then((res) => res.data)
        .catch((err) => {
          console.log(err, err.response);
        }),
    onSuccess: (data) => {
      if (data.code === "200") {
        localStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setUserRecoilState({
          userId: null,
          nickname: "",
          email: "",
          profileImage: "",
        });
        router.push("/");
        toast.success("다음에 또 만나요!");
      }
    },
  });

  if (isLoading) return <SimulationQLoading />;

  return (
    <Container>
      <Box
        sx={{
          width: "52px",
          height: "52px",
          "&:hover": {
            cursor: "pointer",
            opacity: 0.7,
          },
        }}
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <Image src={myProfileUrl} alt="profile" width={52} height={52} />
        <input
          ref={inputRef}
          type={"file"}
          accept={"image/*"}
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            setMyImage(file ?? null);
            if (file) {
              await encodeFileToBase64(file);
            }
          }}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            color: COLORS.WHITE,
            lineHeight: "28px",
            textAlign: "center",
          }}
        >
          {userRecoilState.nickname}
        </Typography>
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
          padding: "10px 12px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
          border: "1px solid " + COLORS.GRAY100,
          color: COLORS.GRAY100,
        }}
        onClick={() => {
          logoutMutation.mutate();
        }}
      >
        {logoutMutation.isPending ? (
          <CircularProgress
            size={18}
            sx={{
              color: COLORS.WHITE,
            }}
          />
        ) : (
          "로그아웃"
        )}
      </Button>
    </Container>
  );
};

export default Profile;

const Container = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1040px;
  width: 100%;
  padding: 40px;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  background: ${COLORS.DARK_BG};
  gap: 30px;
`;
