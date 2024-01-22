import React, { useEffect, useRef, useState } from "react";
import {
  DotLottiePlayer,
  Controls,
  PlayerEvents,
} from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import { Skeleton } from "@mui/material";

const Simulation01 = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="rounded-md overflow-hidden sm:w-[400px] w-[353px] min-w-[353px]">
      <DotLottiePlayer
        src="https://lottie.host/284a3989-c93e-4332-9a80-846d83b12793/qvk87KKVRY.json"
        onEvent={(event: PlayerEvents) => {
          if (event === PlayerEvents.Ready) {
            setLoading(false);
          }
        }}
        background="transparent"
        speed={1}
        style={{
          width: "100%",
          display: loading ? "none" : "block",
        }}
        autoplay
        loop
      />
      <Skeleton
        variant="rectangular"
        width="100%"
        height="122px"
        style={{
          display: loading ? "block" : "none",
        }}
        sx={{
          borderRadius: "10px",
          backgroundColor: "#2D2D2D",
        }}
      />
    </div>
  );
};

export default Simulation01;
