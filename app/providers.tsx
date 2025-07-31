"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SideBar } from "@/components/Layout";
import { useEffect } from "react";
import Analytics from "@/components/Analytics";
import * as gtag from "@/lib/gtag";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserProvider } from "@/contexts/UserContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { DestinationProvider } from "@/contexts/DestinationContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  const handleKakaoInit = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  };
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: 0,
      },
    },
  });

  useEffect(() => {
    if (document.body.getAttribute("style") === "") {
      document.body.removeAttribute("style");
    }
    // 뷰포트 높이를 계산하고 해당 값을 사용하여 요소의 스타일을 업데이트하는 함수
    function adjustViewportHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    // 뷰포트 높이를 계산하는 함수를 실행
    adjustViewportHeight();

    // 뷰포트 높이를 계산하는 함수를 resize 이벤트에 바인딩
    window.addEventListener("resize", adjustViewportHeight);

    // 이벤트를 제거하는 함수를 반환
    return () => {
      window.removeEventListener("resize", adjustViewportHeight);
    };
  }, []);

  return (
    <>
      {/* Meta Pixel Code */}
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_PIXEL_ID}'); 
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=536160555927712&ev=PageView&noscript=1"
        />
      </noscript>
      {/* End Meta Pixel Code */}
      <Script
        src={`https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js`}
        integrity={
          "sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4"
        }
        crossOrigin="anonymous"
        onLoad={handleKakaoInit}
      />
      <Analytics />
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserProvider>
            <ModalProvider>
              <DestinationProvider>
                <div className="min-h-screen flex">{children}</div>
                {/* <Header /> */}
                <SideBar />
              </DestinationProvider>
            </ModalProvider>
          </UserProvider>
        </AuthProvider>
        {/* <Footer /> */}
        <Toaster />
      </QueryClientProvider>
      <GoogleAnalytics gaId={gtag.GA_TRACKING_ID || ""} />
      <GoogleTagManager gtmId={gtag.GTM_TRACKING_ID || ""} />
    </>
  );
}
