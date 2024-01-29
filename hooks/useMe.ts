import { loginState, userState } from "@/states";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";

export const useMe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [nickname, setNickname] = useState("");
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setUserRecoilState] = useRecoilState(userState);

  useEffect(() => {
    async function getProfile() {
      const response = await axios({
        method: "GET",
        url: "https://api.tikitaka.chat/user/kakaoDevLogin",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).catch((err) => {
        toast.error("사용자를 확인하는 중 오류가 발생했습니다.");
        setIsLoggedIn(false);
        setUserRecoilState({
          email: "",
          profileImage: "",
          nickname: "",
          userId: null,
        });
      });

      if (!response) {
        toast.error("로그인이 필요합니다.");
        setIsLoggedIn(false);
        setUserRecoilState({
          email: "",
          profileImage: "",
          nickname: "",
          userId: null,
        });
        router.push("/auth/kakao");
      }

      response?.data.email && setEmail(response?.data.email);
      response?.data.profileImage &&
        setprofileImage(response?.data.profileImage);
      response?.data.nickname && setNickname(response?.data.nickname);

      setIsLoading(false);
    }

    getProfile();
  }, [router]);

  return { isLoading, email, profileImage, nickname };
};
