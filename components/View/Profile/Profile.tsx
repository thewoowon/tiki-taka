"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMe } from "@/hooks/useMe";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import customAxios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

const Profile = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [myImage, setMyImage] = useState<File | null>(null);
  const [myProfileUrl, setMyProfileUrl] = useState("/assets/black-logo.png");
  const { setIsAuthenticated } = useAuth();
  const { user, setUser } = useUser();
  const { isLoading } = useMe();

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
      customAxios({
        method: "POST",
        url: "/user/logout",
        data: {
          userId: user.userId,
        },
      })
        .then((res) => res.data)
        .catch((err) => {
          toast.error("로그아웃 중 오류가 발생했습니다. 다시 로그인해주세요.");
          router.push("/auth/kakao");
        }),
    onSuccess: (data) => {
      if (data.code === "200") {
        localStorage.removeItem("accessToken");
        setIsAuthenticated(false);
        setUser({
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
        <Image
          loader={({ src }) => (src ? src : "/assets/black-logo.png")}
          src={myProfileUrl}
          alt="profile"
          width={52}
          height={52}
        />
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
            fontSize: "18px",
            fontWeight: 600,
            color: COLORS.WHITE,
            lineHeight: "28px",
            textAlign: "center",
          }}
        >
          {user.nickname}
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
          {user.email}
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
