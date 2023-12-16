import React from "react";
import { DotLottiePlayer, Controls } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

const Simulation01 = () => {
  return (
    <div className="rounded-md overflow-hidden">
      <DotLottiePlayer
        src="https://lottie.host/284a3989-c93e-4332-9a80-846d83b12793/qvk87KKVRY.json"
        background="transparent"
        speed={1}
        style={{
          width: "400px",
        }}
        autoplay
        loop
      />
    </div>
  );
};

export default Simulation01;
