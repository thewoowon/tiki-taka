import { gsap } from "gsap";
import { Timeline, Tween } from "react-gsap";
import Image from "next/image";

const GlobalLoading = () => {
  // 3개 이미지가 순차적으로 나타나고 사라지는 애니메이션

  return (
    <Timeline
      target={
        <>
          <Image
            loader={({ src }) => src}
            src="/svg/picky-character.svg"
            alt="Circle"
            style={{ visibility: "hidden" }}
            width={82}
            height={81}
          />
          <Image
            loader={({ src }) => src}
            src="/svg/sunglass-character.svg"
            alt="Triangle"
            style={{ visibility: "hidden" }}
            width={99}
            height={80}
          />
          <Image
            loader={({ src }) => src}
            src="/svg/surprised-character.svg"
            alt="Rectangle"
            style={{ visibility: "hidden" }}
            width={82}
            height={81}
          />
        </>
      }
    >
      <Tween
        from={{ opacity: 0 }}
        to={{ opacity: 1, visibility: "visible" }}
        duration={1}
      />
      <Tween to={{ opacity: 0 }} duration={1} />
      <Tween
        from={{ opacity: 0 }}
        to={{ opacity: 1, visibility: "visible" }}
        duration={1}
      />
      <Tween to={{ opacity: 0 }} duration={1} />
      <Tween
        from={{ opacity: 0 }}
        to={{ opacity: 1, visibility: "visible" }}
        duration={1}
      />
    </Timeline>
  );
};

export default GlobalLoading;
