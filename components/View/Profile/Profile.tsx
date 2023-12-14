import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRef, useState } from "react";
import { useMe } from "@/hooks/useMe";
import { useRecoilState } from "recoil";
import { loginState } from "@/states";

const Profile = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [myImage, setMyImage] = useState<File | null>(null);
  const [myProfileUrl, setMyProfileUrl] = useState("/assets/black-logo.png");
  const [, setIsLoggedIn] = useRecoilState(loginState);

  const { isLoading, email, nickname, profile_image_url } = useMe();

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

  const handleLogout = async () => {
    await window.Kakao.Auth.logout();
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    router.push("/");
  };

  if (isLoading) {
    return <div>로딩중...</div>;
  }

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
          {nickname}
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
          {email}
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
        onClick={handleLogout}
      >
        로그아웃
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
