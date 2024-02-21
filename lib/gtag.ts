// 기본적으로 GA_ID를 발급 받습니다. firebase에서 어플리케이션을 만들고
// 애널리틱스를 추가하면 GA_ID를 발급 받을 수 있습니다.
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID
export const GTM_TRACKING_ID = process.env.NEXT_PUBLIC_GTM_ID

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: URL) => {
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

// google analystics
// 구글 애널리틱스를 사용하기 위해 gtag.ts를 작성했습니다.
// 기본적으로는 구글 애널리틱스를 사용하고 추후에 다른 서비스를 추가로 사용하도록 하겠습니다.
