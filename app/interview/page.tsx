"use client";
import { Simulation01 } from "@/components/Element/Loading";
import Typography from "@/components/Element/Typography";
import { useMe } from "@/hooks/useMe";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const InterviewPage = () => {
  const router = useRouter();

  const handleStartInterview = () => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("로그인이 필요합니다.");
      router.push("/auth/kakao");
      return;
    }
    router.push("/interview/document");
  };

  return (
    <Container>
      <Box>
        <Simulation01 />
        <div className="flex flex-col gap-[8px] pt-[10px]">
          <Typography
            fontSize={24}
            color={COLORS.WHITE}
            textAlign="center"
            fontWeight={700}
          >
            면접을 시작할까요?
          </Typography>
          <Typography
            fontSize={16}
            color={COLORS.WHITE}
            textAlign="center"
            fontWeight={400}
          >
            면접은 중간에 그만 둘 수 있어요. 부담 없이 시작해 보세요.
          </Typography>
        </div>
        <Button onClick={handleStartInterview}>면접 시작하기</Button>
      </Box>
    </Container>
  );
};

export default InterviewPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Button = styled.button`
  display: flex;
  width: 330px;
  padding: 18px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  background-color: ${COLORS.TIKI_DARK_GREEN};
  color: ${COLORS.WHITE};

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.TIKI_GREEN};
  }
`;
