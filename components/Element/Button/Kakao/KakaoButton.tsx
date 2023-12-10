import Link from "next/link";
import React, { useEffect, useState } from "react";

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

const KakaoButton = () => {
  const [locationOrigin, setLocationOrigin] = useState("");
  const kakaoParam: kakaoParamType | URLSearchParams | Record<string, string> =
    {
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: `${locationOrigin}/auth/kakao`,
      response_type: "code",
    };
  const kakaoCodeURL = `https://kauth.kakao.com/oauth/authorize?${new URLSearchParams(
    kakaoParam
  ).toString()}`;

  useEffect(() => {
    if (window && window.location.origin)
      setLocationOrigin(window.location.origin);
  }, []);

  return (
    <Link
      href={kakaoCodeURL}
      className="bg-yellow-300 hover:bg-yellow-200 px-[6px] py-[2px] rounded-md"
    >
      Login with Kakao
    </Link>
  );
};

export default KakaoButton;
