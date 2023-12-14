import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import { COLORS } from "@/style/color";

const SimpleDocumentElement = ({
  pdfDocument,
  onDelete,
}: {
  pdfDocument: {
    id: number;
    source: File | null;
    name: string;
  };
  onDelete: (id: number) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (pdfDocument) {
      const { source } = pdfDocument;
      setFile(source);
    }
  }, [pdfDocument]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        maxWidth: "1040px",
        width: "100%",
        borderRadius: "5px",
        backgroundColor: COLORS.DARK_BG + " !important",
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: COLORS.GRAY100,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
        }}
      >
        {pdfDocument.name || file?.name || "이력서 및 경력 기술서 (형태: pdf)"}
      </Typography>
      <Button
        sx={{
          display: "flex",
          padding: "8px 10px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          borderRadius: "5px",
          border: "1px solid " + COLORS.GRAY100,
          color: COLORS.GRAY100,
        }}
        onClick={() => {
          onDelete(pdfDocument.id);
        }}
      >
        삭제하기
      </Button>
    </Box>
  );
};

export default SimpleDocumentElement;

const FileInput = styled.input`
  display: none;
`;
