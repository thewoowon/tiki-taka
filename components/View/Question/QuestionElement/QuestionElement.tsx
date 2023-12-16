import { COLORS } from "@/style/color";
import { Box } from "@mui/material";

const QuestionElement = ({
  question,
  sequence,
}: {
  question: QuestionElementType;
  sequence: number;
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1040px",
        display: "flex",
        padding: "16px 20px",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "10px",
        borderRadius: "5px",
        background: COLORS.DARK_BG,
        color: COLORS.GRAY100,
      }}
    >
      질문 {sequence}. {question.question}
    </Box>
  );
};

export default QuestionElement;
