import { HISTORY_COUNT_LIMIT } from "@/constants/limit";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HistoryElement from "./HistoryElement/HistoryElement";
import ExclamationMark2 from "@/public/svg/exclamation-mark-2.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loading } from "../Loading";
import toast from "react-hot-toast";
import customAxios from "@/lib/axios";
import { useUser } from "@/contexts/UserContext";
import { useAuth } from "@/contexts/AuthContext";

const History = ({ type }: { type: "deleteOnly" | "all" }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [histories, setHistories] = useState<HistoryElementType[]>([]);
  const { user, setUser } = useUser();
  const { setIsAuthenticated } = useAuth();

  const [currentHistory, setCurrentHistory] =
    useState<HistoryElementType | null>(null);

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["interviews", user.userId],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/interview/getInterviewList?userId=" + user.userId,
        data: {
          userId: user.userId,
        },
      }).then((res) => res.data);
    },
  });

  const deleteInterviewMutation = useMutation({
    mutationFn: (interviewId: number) => {
      return customAxios({
        method: "DELETE",
        url: "/interview/deleteInterview",
        data: {
          userId: user.userId,
          interviewId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        toast.success("삭제가 완료됐어요. 면접을 다시 시작해주세요.");
        refetch();
      } else {
        toast.error("면접 이력 삭제하지 못했어요. 다시 시도해 주세요.");
      }
    },
    onError: () => {
      toast.error("면접 이력 삭제에 실패했어요. 다시 시도해 주세요.");
    },
  });

  const initInterviewMutation = useMutation({
    mutationFn: (interviewId: number) => {
      return customAxios({
        method: "POST",
        url: "/interview/initQa",
        data: {
          userId: user.userId,
          interviewId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") {
        toast.success("면접 답변 초기화에 성공했어요.");
        router.push(
          "/interview/question?interviewId=" + currentHistory?.interviewId
        );
      } else {
        toast.error("면접 답변 초기화를 하지 못했어요. 다시 시도해 주세요.");
      }
    },
    onError: () => {
      toast.error("면접 답변 초기화를 진행했어요. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (data) {
      if (data.code === "로그인이 필요합니다") {
        toast.error("로그인이 필요합니다.");
        router.push("/auth/kakao");
        setIsAuthenticated(false);
      }
      if (data.code === "200") setHistories(data.data);
    }
  }, [data, router, setIsAuthenticated]);

  if (isLoading)
    return (
      <Loading
        title="면접 이력을 가져오고 있어요."
        description="잠시만 기다려주세요."
      />
    );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      {histories?.map((history, index) => {
        return (
          <HistoryElement
            key={index}
            history={history}
            type={type}
            onDelete={() => {
              setCurrentHistory(history);
              handleOpen();
            }}
            onContinue={() => {
              if (history && history.interviewId)
                router.push(
                  "/interview/question?interviewId=" +
                    history.interviewId +
                    "&continue=true"
                );
              else {
                toast.error("내부에서 에러가 발생했어요. 다시 시도해 주세요.");
              }
            }}
            onResult={() => {
              router.push(
                "/interview/result?interviewId=" + history.interviewId
              );
            }}
          />
        );
      })}
      {histories?.length == 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <ExclamationMark2 />
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 400,
              color: COLORS.GRAY100,
              lineHeight: "24px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            아직 면접 이력이 없어요.
            <br />
            지금 바로 면접을 시작해 보세요!
          </Typography>
          <Button
            sx={{
              display: "flex",
              width: "320px",
              padding: "18px 10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              backgroundColor: COLORS.TIKI_GREEN + " !important",
              color: COLORS.WHITE,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "16px",
            }}
            onClick={() => {
              router.push("/interview");
            }}
          >
            AI 면접 보기
          </Button>
        </Box>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: "23px",
              color: COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            {currentHistory?.title}
          </Typography>
          <Typography
            sx={{
              color: COLORS.GRAY100,
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          >
            면접 기록을 삭제할까요?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                if (currentHistory && currentHistory.interviewId) {
                  deleteInterviewMutation.mutate(currentHistory?.interviewId);
                } else {
                  toast.error(
                    "내부에서 에러가 발생했어요. 다시 시도해 주세요."
                  );
                }
                handleClose();
              }}
            >
              네
            </Button>
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                color: COLORS.TIKI_GREEN,
              }}
              onClick={handleClose}
            >
              아니오
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            sx={{
              fontSize: "23px",
              color: COLORS.WHITE,
              fontWeight: 700,
            }}
          >
            {currentHistory?.title} 면접을 이어서 진행할까요?
          </Typography>
          <Typography
            sx={{
              color: COLORS.GRAY100,
              textAlign: "center",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "24px",
            }}
          >
            {"[처음부터] 버튼을 클릭하면 질문은 동일, 입력한 답변은 초기화돼요"}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",
            }}
          >
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                if (currentHistory && currentHistory.interviewId)
                  initInterviewMutation.mutate(currentHistory?.interviewId);
                else {
                  toast.error(
                    "내부에서 에러가 발생했어요. 다시 시도해 주세요."
                  );
                  handleClose();
                }
              }}
            >
              처음부터
            </Button>
            <Button
              sx={{
                display: "flex",
                width: "145px",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                color: COLORS.TIKI_GREEN,
              }}
              onClick={() => {
                if (currentHistory && currentHistory.interviewId)
                  router.push(
                    "/interview/question?interviewId=" +
                      currentHistory.interviewId +
                      "&continue=true"
                  );
                else {
                  toast.error(
                    "내부에서 에러가 발생했어요. 다시 시도해 주세요."
                  );
                  handleClose();
                }
              }}
            >
              이어서 진행
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </Box>
  );
};

export default History;
