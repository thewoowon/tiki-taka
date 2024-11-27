"use client";
import { gsap } from "gsap";
import Image from "next/image";
import { useEffect } from "react";

const GlobalLoading = () => {
  useEffect(() => {
    const images = gsap.utils.toArray(".loading-image");
    images.forEach((image, index) => {
      gsap.to(image as gsap.TweenTarget, {
        duration: 1,
        y: -50,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut",
        delay: index * 0.2,
      });
    });
  }, []);

  return (
    <div
      className="loading-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        width: "100%",
        height: "200px",
      }}
    >
      <Image
        className="loading-image"
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/picky-character.svg"
        alt="Circle"
        width={41}
        height={40}
      />
      <Image
        className="loading-image"
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/sunglass-character.svg"
        alt="Triangle"
        width={50}
        height={40}
      />
      <Image
        className="loading-image"
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/surprised-character.svg"
        alt="Rectangle"
        width={41}
        height={40}
      />
    </div>
  );
};

export default GlobalLoading;
