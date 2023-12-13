import { HISTORY_COUNT_LIMIT } from "@/constants/limit";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import { Box, Typography, Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import HistoryElement from "./HistoryElement/HistoryElement";
import ExclamationMark from "@/public/svg/exclamation-mark.svg";

const History = ({ type }: { type: "deleteOnly" | "all" }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [histories, setHistories] = useState<HistoryElementType[]>([
    {
      id: 1,
      title: "카카오페이_서비스기획자",
      status: "진행중",
      lastUsed: "2023-06-01",
    },
    {
      id: 2,
      title: "네이버페이_서비스기획자",
      status: "중단",
      lastUsed: "2022-10-10",
    },
    {
      id: 3,
      title: "카카오페이_서비스기획자",
      status: "진행중",
      lastUsed: "2023-06-01",
    },
    {
      id: 4,
      title: "오늘밤 주인공은 나야나",
      status: "마감",
      lastUsed: "2023-06-01",
    },
    {
      id: 5,
      title: "돈 내고 보는 이력서",
      status: "진행중",
      lastUsed: "2023-06-01",
    },
  ]);

  const [currentHistory, setCurrentHistory] =
    useState<HistoryElementType | null>(null);

  useEffect(() => {
    if (histories.length < HISTORY_COUNT_LIMIT) {
      router.push("/interview/chat");
    }
  }, [histories, router]);

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
      {histories.map((history, index) => {
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
              handleOpen();
            }}
          />
        );
      })}
      {histories.length == 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <ExclamationMark />
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
              width: "100%",
              padding: "18px 20px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              backgroundColor: COLORS.TIKI_GREEN + " !important",
              color: COLORS.WHITE,
            }}
            onClick={() => {}}
          >
            확인
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
                // 삭제 mutation
                setHistories(
                  histories.filter(
                    (history) => history.id !== currentHistory?.id
                  )
                );
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
    </Box>
  );
};

export default History;
