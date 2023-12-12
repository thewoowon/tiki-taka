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
      }}
    >
      {questions.map((question, index) => {
        return <QuestionElement key={index} question={question} />;
      })}
    </Box>
  );
};

export default Question;
