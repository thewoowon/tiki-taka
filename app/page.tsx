import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ArticleType } from "@/types";
import HomeView from "@/components/View/HomeView";
import customAxios from "@/lib/axios";

// export const getStaticProps: GetStaticProps = async () => {
//   try {
//     // 첫 번째 페이지의 데이터만 가져옵니다
//     const response = await customAxios({
//       method: "GET",
//       url: "/article/getArticleList",
//       params: {
//         startNumber: 0,
//         offsetNumber: 10, // 초기 10개만 가져옴
//       },
//     });

//     return {
//       props: {
//         initialData: response.data,
//       },
//       revalidate: 60, // 페이지를 60초마다 재검증하여 갱신함
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       notFound: true,
//     };
//   }
// };

export default async function Home() {
  // 첫 번째 페이지의 데이터만 가져옵니다
  const response = await customAxios({
    method: "GET",
    url: "/article/getArticleList",
    params: {
      startNumber: 0,
      offsetNumber: 100, // 초기 100개만 가져옴
    },
  });

  const articles = response.data.data;
  return <HomeView initialData={articles} />;
}
