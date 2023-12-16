import { Box } from "@mui/material";
import QuestionElement from "./QuestionElement";

const Question = ({ questions }: { questions: QuestionElementType[] }) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        overflowY: "scroll",
        overflowX: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        height: "650px",
      }}
    >
      {questions.map((question, index) => {
        return (
          <QuestionElement
            key={index}
            question={question}
            sequence={index + 1}
          />
        );
      })}
    </Box>
  );
};

export default Question;
