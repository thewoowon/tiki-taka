import { Loading } from "@/components/View/Loading";
import useKakaoLogin from "@/hooks/useKakaoLogin";

const KakaoCallbackView = () => {
  // 카카오 로그인
  const { isLoading, onLoadingToggle } = useKakaoLogin();

  if (isLoading) {
    return <Loading title="로그인 중" description="잠시만 기다려주세요." />;
  }

  return null;
};

export default KakaoCallbackView;
