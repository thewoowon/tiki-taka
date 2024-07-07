"use client";

import { InterviewResultView } from "@/components/View/Interview";
import { Loading } from "@/components/View/Loading";
import { Suspense } from "react";

const InterviewResultPage = () => {
  return (
    <Suspense
      fallback={
        <Loading
          title="정보를 불러오는 중이에요 🥳"
          description="조금만 기다려주세요!"
        />
      }
    >
      <InterviewResultView />
    </Suspense>
  );
};

export default InterviewResultPage;
