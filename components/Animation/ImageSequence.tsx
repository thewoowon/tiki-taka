import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const ImageSequence = () => {
  const refCircle = useRef(null);
  const refTriangle = useRef(null);
  const refRectangle = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(refCircle.current, { duration: 0.5, autoAlpha: 1 })
      .to(refCircle.current, { duration: 0.5, autoAlpha: 0 })
      .to(refTriangle.current, { duration: 0.5, autoAlpha: 1 })
      .to(refTriangle.current, { duration: 0.5, autoAlpha: 0 })
      .to(refRectangle.current, { duration: 0.5, autoAlpha: 1 })
      .to(refRectangle.current, { duration: 0.5, autoAlpha: 0 });
  }, []);

  return (
    <>
      <Image
        ref={refCircle}
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/picky-character.svg"
        alt="Circle"
        style={{ visibility: "hidden" }}
        width={82}
        height={81}
      />
      <Image
        ref={refTriangle}
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/sunglass-character.svg"
        alt="Triangle"
        style={{ visibility: "hidden" }}
        width={99}
        height={80}
      />
      <Image
        ref={refRectangle}
        loader={({ src }) => (src ? src : "/assets/article-banner.png")}
        src="/svg/surprised-character.svg"
        alt="Rectangle"
        style={{ visibility: "hidden" }}
        width={82}
        height={81}
      />
    </>
  );
};

export default ImageSequence;
