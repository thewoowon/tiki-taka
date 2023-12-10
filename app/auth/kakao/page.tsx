"use client";
import KakaoButton from "@/components/Element/Button/Kakao/KakaoButton";
import GlobalLoading from "@/components/Element/GlobalLoading";
import useKakaoLogin from "@/hooks/useKakaoLogin";
import styled from "@emotion/styled";

// 애초에 로그인이 되어 있다면 마이페이지로 이동

const KakaoLoginPage = () => {
  // 카카오 로그인
  const { isLoading, onLoadingToggle } = useKakaoLogin();

  return (
    <Container>
      <h1>AI 면접 진행을 위해 로그인이 필요해요.</h1>
      <KakaoButton />
      {isLoading ? <GlobalLoading /> : null}
    </Container>
  );
};

export default KakaoLoginPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
