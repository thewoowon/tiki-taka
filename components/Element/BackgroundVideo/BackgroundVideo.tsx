import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "../LoadingSpinner";
import styled from "@emotion/styled";

const BackgroundVideo = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [isMVideoLoading, setIsMVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const mVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoCanPlay = () => {
    setIsVideoLoading(false);
  };

  const handleMVideoCanPlay = () => {
    setIsMVideoLoading(false);
  };

  const playVideo = (video: HTMLVideoElement | null) => {
    if (video) {
      video.play().catch((error) => {
        console.error("비디오 재생 중 오류가 발생했습니다.", error);
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    playVideo(video);

    const mVideo = mVideoRef.current;
    playVideo(mVideo);
  }, []);

  return (
    <Container>
      {(isVideoLoading || isMVideoLoading) && <LoadingSpinner />}
      <Video
        ref={videoRef}
        autoPlay
        muted
        loop
        onCanPlay={handleVideoCanPlay}
        preload="auto"
      >
        <source src="/videos/background.mp4" type="video/mp4" />
        비디오를 지원하지 않는 브라우저입니다.
      </Video>
      <MVideo
        ref={mVideoRef}
        autoPlay
        muted
        loop
        onCanPlay={handleMVideoCanPlay}
        preload="auto"
      >
        <source src="/videos/m-background.mp4" type="video/mp4" />
        비디오를 지원하지 않는 브라우저입니다.
      </MVideo>
      <Shade />
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

  @media (max-width: 768px) {
    display: none;
  }
`;

const MVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);

  @media (min-width: 768px) {
    display: none;
  }
`;

const Shade = styled.div`
  background: radial-gradient(
      137.47% 43.57% at 50% 50%,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
    linear-gradient(
      187deg,
      rgba(0, 0, 0, 0) 56.14%,
      rgba(0, 0, 0, 0.1) 72.48%,
      #000 98.3%
    );
  background-blend-mode: normal, normal, normal;
  background-position: 1.123px -839.09px, center, center;
  background-repeat: no-repeat, no-repeat, no-repeat;
  background-size: 100.158% 53.767%, cover, cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
