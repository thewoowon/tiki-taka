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

      <Script id="google-analytics">
        {`
          (
            function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({
                'gtm.start': new Date().getTime(),
                event:'gtm.js'
              });
              var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            }
          )(window,document,'script','dataLayer','${gtag.GTM_TRACKING_ID}');
        `}
      </Script>
    </div>
  );
}

export default Analytics;
