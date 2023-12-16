import React from "react";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const SimulationQLoading = () => {
  return (
    <div>
      <DotLottiePlayer
        src="https://lottie.host/2e67036e-9427-4d16-bc98-dd78cfad76f5/mY7Hqcqc4q.json"
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

export default SimulationQLoading;
