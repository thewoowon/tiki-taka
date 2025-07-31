import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useDestination } from "@/contexts/DestinationContext";

type kakaoParamType = {
  client_id?: string;
  redirect_uri: string;
  response_type: string;
};

type KakaoButtonProps = {
  destination?: string | null;
};

const KakaoButton = ({ destination }: KakaoButtonProps) => {
  const [locationOrigin, setLocationOrigin] = useState("");
  const { setDestination } = useDestination();

  const kakaoParam: kakaoParamType | URLSearchParams | Record<string, string> =
    {
      client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
      redirect_uri: `${locationOrigin}/auth/kakao/callback`,
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
    <Button
      onClick={() => {
        if (destination) {
          setDestination(destination);
        }
      }}
      href={kakaoCodeURL}
    >
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="24" height="24" fill="#FAE100" />
        <path
          d="M12.5 5C7.52927 5 3.5 7.88881 3.5 11.4544C3.5 13.7743 5.20619 15.8076 7.76888 16.9453C7.58025 17.5819 7.08742 19.2545 6.98886 19.6121C6.8665 20.0561 7.1673 20.0499 7.36613 19.9312C7.52077 19.8372 9.83195 18.4112 10.8295 17.7962C11.3716 17.8686 11.929 17.9072 12.5 17.9072C17.4707 17.9072 21.5 15.0184 21.5 11.4544C21.5 7.89036 17.4707 5 12.5 5Z"
          fill="#191600"
        />
      </svg>
      카카오로 시작하기
    </Button>
  );
};

export default KakaoButton;

const Button = styled(Link)`
  display: flex;
  width: 300px;
  padding: 14px 10px;
  justify-content: center;
  align-items: center;
  gap: 6px;
  border-radius: 5px;
  background: #fae100;

  &:hover {
    background: #f8d500;
  }
`;
