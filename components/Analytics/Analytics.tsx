import Script from "next/script";
import * as gtag from "@/lib/gtag";

function Analytics() {
  return (
    <div className="container">
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${gtag.GA_TRACKING_ID}');
        `}
      </Script>
    </div>
  );
}

export default Analytics;
