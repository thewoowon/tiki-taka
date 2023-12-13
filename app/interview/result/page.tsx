"use client";

import { ResultLoading } from "@/components/View/ResultLoading";
import { useEffect, useState } from "react";

const InterviewResultPage = () => {
  const [tempLoading, setTempLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setTempLoading(false);
    }, 2000);
  }, [tempLoading]);

  if (tempLoading) {
    return (
      <ResultLoading
        title={"결과 만드는 중"}
        description={
          "{@이름(카카오연동)}님의 답변과 채용 공고를 바탕으로 면접 결과를 만들고 있어요."
        }
      />
    );
  }
  return <div></div>;
};

export default InterviewResultPage;
