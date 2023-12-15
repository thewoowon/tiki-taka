"use client";
import { Loading } from "@/components/View/Loading";
import useKakaoLogin from "@/hooks/useKakaoLogin";
import { useEffect } from "react";

const KakaoLoginCallbackPage = () => {
  // 카카오 로그인
  const { isLoading, onLoadingToggle } = useKakaoLogin();

  useEffect(() => {}, []);

  if (isLoading) {
    return <Loading title="로그인 중" description="잠시만 기다려주세요." />;
  }

  return null;
};

export default KakaoLoginCallbackPage;
