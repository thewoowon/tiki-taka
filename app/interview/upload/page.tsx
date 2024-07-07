"use client";
import { Loading } from "@/components/View/Loading";
import { UploadView } from "@/components/View/Upload";
import { Suspense } from "react";

const UploadPage = () => {
  return (
    <Suspense
      fallback={
        <Loading
          title="정보를 불러오는 중이에요 🥳"
          description="조금만 기다려주세요!"
        />
      }
    >
      <UploadView />
    </Suspense>
  );
};

export default UploadPage;
