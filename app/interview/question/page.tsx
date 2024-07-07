"use client";

import { Loading } from "@/components/View/Loading";
import { QuestionView } from "@/components/View/Question";
import { Suspense } from "react";

const QuestionPage = () => {
  return (
    <Suspense
      fallback={
        <Loading
          title="정보를 불러오는 중이에요 🥳"
          description="조금만 기다려주세요!"
        />
      }
    >
      ƒ<QuestionView />
    </Suspense>
  );
};

export default QuestionPage;
