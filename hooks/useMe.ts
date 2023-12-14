import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useMe = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profile_image_url, setProfile_image_url] = useState("");
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    async function getProfile() {
      const response = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      if (!response) {
        router.push("/auth/kakao");
      }

      response?.kakao_account?.email &&
        setEmail(response?.kakao_account?.email);
      response?.properties?.profile_image_url &&
        setProfile_image_url(response?.properties?.profile_image_url);
      response?.properties?.nickname &&
        setNickname(response?.properties?.nickname);

      setIsLoading(false);
    }

    if (!window.Kakao) {
      return;
    }

    if (!window.Kakao.Auth.getAccessToken()) {
      router.push("/auth/kakao");
    }

    getProfile();
  }, [router]);

  return { isLoading, email, profile_image_url, nickname };
};
