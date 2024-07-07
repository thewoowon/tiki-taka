"use client";
import KakaoCallbackView from "@/components/View/Auth/KakaoCallbackView";
import { Loading } from "@/components/View/Loading";
import { Suspense } from "react";

const KakaoLoginCallbackPage = () => {
  return (
    <Suspense
      fallback={
        <Loading
          title="정보를 불러오는 중이에요 🥳"
          description="조금만 기다려주세요!"
        />
      }
    >
      <KakaoCallbackView />
    </Suspense>
  );
};

export default KakaoLoginCallbackPage;
