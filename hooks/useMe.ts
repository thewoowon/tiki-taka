import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const useMe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    async function getProfile() {
      const response = await axios({
        method: "GET",
        url: "https://api.tikitaka.chat/user/kakaoLogin",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }).catch((err) => {
        if (err.response.status === 401) {
          router.push("/auth/kakao");
        }
      });

      if (!response) {
        toast.error("로그인이 필요합니다.");
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
