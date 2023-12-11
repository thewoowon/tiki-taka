import { useState } from "react";
import DocumentElement from "./DocumentElement";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import { Box } from "@mui/material";

const Document = () => {
  const [documents, setDocuments] = useState<
    {
      source: File | null;
      name: string;
    }[]
  >([]);

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
      {documents.map((document, index) => (
        <DocumentElement key={index} document={document} />
      ))}
      {PDF_FILE_COUNT_LIMIT - documents.length > 0 && <DocumentElement />}
    </Box>
  );
};

export default Document;
