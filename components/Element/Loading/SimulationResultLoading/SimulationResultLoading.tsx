import React from "react";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const SimulationResultLoading = () => {
  return (
    <div>
      <DotLottiePlayer
        src="https://lottie.host/caae12c0-53d0-45ba-921f-55278c1d58ae/9LejQctft3.json"
        background="transparent"
        speed={1}
        style={{
          width: "400px",
          height: "400px",
        }}
        autoplay
        loop
      />
    </div>
  );
};

export default SimulationResultLoading;
