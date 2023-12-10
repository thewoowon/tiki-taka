import styled from "@emotion/styled";
import TikitakaMain from "@/public/svg/tikitaka-main.svg";

const RedGradientExtra = () => {
  return (
    <AnimationWave>
      <TikitakaMain />
    </AnimationWave>
  );
};

export default RedGradientExtra;

const AnimationWave = styled.div`
  svg {
    rect:nth-of-type(1) {
      animation: wave 4s ease-in-out forwards;
    }
    rect:nth-of-type(2) {
      animation: wave 4s ease-in-out 0.2s forwards;
    }
    rect:nth-of-type(3) {
      animation: wave 4s ease-in-out 0.4s forwards;
    }
    rect:nth-of-type(4) {
      animation: wave 4s ease-in-out 0.6s forwards;
    }
    rect:nth-of-type(5) {
      animation: wave 4s ease-in-out 0.8s forwards;
    }
    rect:nth-of-type(6) {
      animation: wave 4s ease-in-out 1s forwards;
    }
    rect:nth-of-type(7) {
      animation: wave 4s ease-in-out 1.2s forwards;
    }
    rect:nth-of-type(8) {
      animation: wave 4s ease-in-out 1.4s forwards;
    }
    rect:nth-of-type(9) {
      animation: wave 4s ease-in-out 1.6s forwards;
    }
    rect:nth-of-type(10) {
      animation: wave 4s ease-in-out 1.8s forwards;
    }

    @keyframes wave {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;
