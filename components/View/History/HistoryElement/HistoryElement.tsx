import { Box, Button, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { COLORS } from "@/style/color";

const HistoryElement = ({
  history,
  type,
  onDelete,
  onContinue,
  onResult,
}: {
  history: HistoryElementType;
  type: "deleteOnly" | "all";
  onDelete: () => void;
  onContinue: () => void;
  onResult: () => void;
}) => {
  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "6px",
        }}
      >
        <Typography
          sx={{
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 600,
            lineHeight: "24px",
            color: COLORS.WHITE,
          }}
        >
          {history.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "21px",
            color: COLORS.TIKI_GREEN,
          }}
        >
          {history.status === 1
            ? "완료"
            : `${history.useCnt} / ${history.totalCnt}`}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "21px",
            color: COLORS.GRAY400,
            marginTop: "10px",
          }}
        >
          마지막 진행일 : {new Date(history.regDate).toISOString().slice(0, 10)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          sx={{
            display: "flex",
            padding: "8px 10px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            borderRadius: "5px",
            border: `1px solid ${COLORS.GRAY100}`,
            color: COLORS.GRAY100,
          }}
          onClick={onDelete}
        >
          삭제하기
        </Button>
        {type === "all" && (
          <Button
            sx={{
              display: "flex",
              padding: "8px 10px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              borderRadius: "5px",
              backgroundColor:
                history.status === 1
                  ? COLORS.GRAY100 + "!important"
                  : COLORS.TIKI_DARK_GREEN + "!important",
              color: COLORS.WHITE,
            }}
            onClick={history.status === 1 ? onResult : onContinue}
          >
            {history.status === 1 ? "결과보기" : "계속하기"}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HistoryElement;

const Container = styled(Box)`
  width: 100%;
  max-width: 1040px;
  height: 148px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 10px;
  background: ${COLORS.DARK_BG};
`;
