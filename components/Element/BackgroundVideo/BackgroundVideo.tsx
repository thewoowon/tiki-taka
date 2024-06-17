// components/BackgroundVideo.js
import React, { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import styled from "@emotion/styled";

const BackgroundVideo = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  return (
    <Container>
      {isLoading && <LoadingSpinner />}
      <Video autoPlay muted loop onCanPlay={handleCanPlay} preload="auto">
        <source src="/videos/background.mp4" type="video/mp4" />
        비디오를 지원하지 않는 브라우저입니다.
      </Video>
    </Container>
  );
};

export default BackgroundVideo;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
`;

const Video = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
`;
