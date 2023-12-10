import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

const useKakaoLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleLoadingToggle = (flag: boolean) => {
    setIsLoading(flag);
  };

  const handleGetProfile = useCallback(async () => {
    try {
      console.log("handleGetProfile");
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
      const options = {
        method: "POST",
        url: `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${
          process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY
        }&redirect_uri=${""}&code=${code}`,
        data: code,
      };

      const response = await axios(options).catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

      if (response?.status !== 200) {
        setIsLoading(false);
        return;
      }

      window.Kakao.Auth.setAccessToken(response?.data?.access_token);

      handleGetProfile();
    },
    [handleGetProfile]
  );

  useEffect(() => {
    if (!params.get("code")) return;

    setIsLoading(true);
    handleLogin(params.get("code"));
  }, [handleLogin, params]);

  return { isLoading, onLoadingToggle: handleLoadingToggle };
};

export default useKakaoLogin;
