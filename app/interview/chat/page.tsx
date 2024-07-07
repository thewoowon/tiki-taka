"use client";
import { Suspense } from "react";
import { InterviewChatView } from "@/components/View/Interview";
import { Loading } from "@/components/View/Loading";

const InterviewChatPage = () => {
  return (
    <Suspense
      fallback={
        <Loading
          title="정보를 불러오는 중이에요 🥳"
          description="조금만 기다려주세요!"
        />
      }
    >
      <InterviewChatView />
    </Suspense>
  );
};

export default InterviewChatPage;
