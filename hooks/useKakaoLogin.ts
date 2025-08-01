import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import customAxios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const { setIsAuthenticated } = useAuth();
  const { setUser } = useUser();

  const handleLoadingToggle = (flag: boolean) => {
    setIsLoading(flag);
  };

  const handleGetProfile = useCallback(async () => {
    try {
      const response = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      if (!response) return;

      router.push("/");
    } catch (err) {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogin = useCallback(
    async (code: string | string[] | null) => {
      const result = await customAxios({
        method: "GET",
        url: `/user/kakaoLogin?code=${code}`,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
      if (result?.status !== 200) {
        setIsLoading(false);
        router.push("/auth/kakao");
        return;
      }

      if (result.data.code === "700") {
        // 회원가입 완료 -> 다시 로그인 필요
        setIsLoading(false);
        router.push("/auth/kakao");
        return;
      }

      if (result.data.code === "200") {
        // 로그인 완료
        setIsLoading(false);
        localStorage.setItem("accessToken", result.headers.accesstoken);
        setUser({
          email: result.data.data.email,
          profileImage: result.data.data.profileImage,
          nickname: result.data.data.name,
          userId: result.data.data.userId,
        });
        setIsAuthenticated(true);
        router.push("/");
        return;
      }

      if (result.data.code === "500") {
        // 서버 에러
        setIsLoading(false);
        router.push("/auth/kakao");
        return;
      }

      setIsLoading(false);
    },
    [router]
  );

  useEffect(() => {
    if (!params.get("code")) return;

    setIsLoading(true);
    handleLogin(params.get("code"));
  }, [handleLogin, params]);

  return { isLoading, onLoadingToggle: handleLoadingToggle };
};

export default useKakaoLogin;
