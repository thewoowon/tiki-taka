import type Chrome from "chrome";
import {
  ChatHistories,
  SessionHistories,
} from "@pages/background/lib/storage/chatHistoryStorage";

declare namespace chrome {
  export default Chrome;
}

declare module "virtual:reload-on-update-in-background-script" {
  export const reloadOnUpdate: (watchPath: string) => void;
  export default reloadOnUpdate;
}

declare module "virtual:reload-on-update-in-view" {
  const refreshOnUpdate: (watchPath: string) => void;
  export default refreshOnUpdate;
}

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}

declare module "*.json" {
  const content: string;
  export default content;
}

declare global {
  type Chat = {
    role: "user" | "assistant" | "error";
    content: string;
  };

  type News = {
    id: number;
    title: string;
    content: string;
    journalist: string;
    src: string;
    press: string;
    date: string;
    url: string;
    summary: string;
  };

  type SideMessageType = {
    leftMessage?: React.ReactNode | null;
    rightMessage?: React.ReactNode | null;
  };

  type HistoryElementType = {
    interviewId: number;
    userId: number;
    title: string;
    totalCnt: number;
    useCnt: number;
    status: number;
    regDate: string;
  };

  type QuestionElementType = {
    interviewId: number;
    qaId: number;
    question: string;
    answer: string;
    regDate: string;
    modifyDate: string;
  };

  type QuestionType = {
    role: "user" | "interviewer" | "ai";
    interviewId: number;
    qaId: number;
    question: string;
    answer: string;
    regDate: string;
    modifyDate: string;
  };

  type DocumentPDFType = {
    resumeId: number;
    fileName: string;
    regDate: string;
  };

  type ResultType = {
    interviewId: number;
    interviewerFeel: string;
    userId: number;
    title: string;
    status: number;
    regDate: string;
    feedback: string;
    qaData: {
      answer: string;
      bestAnswer: string;
      interviewId: number;
      keyword: string[];
      modifyDate: string;
      qaId: number;
      question: string;
      regDate: string;
    }[];
  };

  interface Window {
    naver: any;
    Kakao: any; // 나중에 설명할 카카오 로그인을 위해 이 부분도 추가해주세요!
    gtag: any;
  }
}
