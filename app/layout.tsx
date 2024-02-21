"use client";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { Footer, Header, SideBar } from "@/components/Layout";
import Script from "next/script";
import { useCallback, useEffect } from "react";
import Analytics from "@/components/Analytics";
import { usePathname } from "next/navigation";
import * as gtag from "@/lib/gtag";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        retry: 0,
      },
    },
  });

  const handleKakaoInit = () => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
  };

  const pathName = usePathname();

  const handleRouteChange = useCallback((url: URL) => {
    gtag.pageview(url);
  }, []);

  useEffect(() => {
    pathName && handleRouteChange(new URL(pathName, window.location.href));

    return () => {
      pathName && handleRouteChange(new URL(pathName, window.location.href));
    };
  }, [handleRouteChange, pathName]);

  useEffect(() => {
    if (document.body.getAttribute("style") === "") {
      document.body.removeAttribute("style");
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{process.env.NEXT_PUBLIC_TITLE}</title>
        <meta property="og:title" content={process.env.NEXT_PUBLIC_TITLE} />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <meta property="og:image" content={process.env.NEXT_PUBLIC_OG_IMAGE} />
        <meta property="og:image:alt" content="My custom alt" />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <meta property="og:type" content={process.env.NEXT_PUBLIC_OG_TYPE} />
        <meta
          property="og:description"
          content={process.env.NEXT_PUBLIC_OG_DESCRIPTION}
        />

        <meta
          property="og:site_name"
          content={process.env.NEXT_PUBLIC_OG_SITE_NAME}
        />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_OG_URL} />
        <meta
          property="og:locale"
          content={process.env.NEXT_PUBLIC_OG_LOCALE}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site:id" content="1467726470533754880" />
        <meta name="twitter:creator" content="@nextjs" />
        <meta name="twitter:creator:id" content="1467726470533754880" />
        <meta name="twitter:title" content="Next.js" />
        <meta
          name="twitter:description"
          content="The React Framework for the Web"
        />
        <meta name="twitter:image" content="https://nextjs.org/og.png" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="google-site-verification"
          content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION}
        />
        <meta
          name="naver-site-verification"
          content={process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION}
        />
        <Script
          src={`https://t1.kakaocdn.net/kakao_js_sdk/2.5.0/kakao.min.js`}
          integrity={
            "sha384-kYPsUbBPlktXsY6/oNHSUDZoTX6+YI51f63jCPEIPFP09ttByAdxd2mEjKuhdqn4"
          }
          crossOrigin="anonymous"
          onLoad={handleKakaoInit}
        />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WMPN6NGH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <div className="min-h-screen flex">{children}</div>
            {/* <Header /> */}
            <SideBar />
            {/* <Footer /> */}
            <Analytics />
          </RecoilRoot>
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  );
}
