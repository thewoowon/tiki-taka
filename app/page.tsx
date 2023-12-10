"use client";
import ImageSequence from "@/components/Animation/ImageSequence";
import TikitakaMain from "@/public/svg/tikitaka-main.svg";
import styled from "@emotion/styled";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full mx-auto overflow-hidden">
      <Grid className="max-w-[1440px] flex justify-center items-center">
        <ImageSequence />
      </Grid>
    </main>
  );
}

const Grid = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
  flex-wrap: nowrap;
  padding: 100px 0;
`;
