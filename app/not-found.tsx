"use client";

import Link from "next/link";
import Image from "next/image";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";

export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: COLORS.DARK_BG,
          padding: "20px 24px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            position: "relative",
          }}
        >
          <Image
            src={"/assets/network-error.png"}
            alt=""
            priority
            fill
            loader={({ src }) => (src ? src : "/assets/network-error.png")}
          />
        </div>
        <div
          style={{
            color: COLORS.WHITE,
            padding: "16px",
            textAlign: "center",
            fontFamily: "Pretendard Variable",
            fontWeight: 400,
          }}
        >
          존재하지 않는 경로에요 🤣
        </div>
        <Button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          홈으로 가기
        </Button>
      </div>
    </div>
  );
}

const Button = styled.button`
  display: flex;
  width: 330px;
  height: 52px;
  padding: 18px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background-color: ${COLORS.TIKI_DARK_GREEN};
  color: ${COLORS.WHITE};
  font-size: 16px;
  font-weight: semibold;

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.TIKI_GREEN};
  }

  @media (max-width: 768px) {
    width: 353px;
  }
`;
