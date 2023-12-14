import { COLORS } from "@/style/color";
import { Box } from "@mui/material";

const QuestionElement = ({ question }: { question: QuestionElementType }) => {
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
      질문 {question.id}. {question.content}
    </Box>
  );
};

export default QuestionElement;
