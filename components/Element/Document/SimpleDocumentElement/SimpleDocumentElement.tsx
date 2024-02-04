import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { COLORS } from "@/style/color";

const SimpleDocumentElement = ({
  pdfDocument,
  onDelete,
}: {
  pdfDocument: DocumentPDFType;
  onDelete: () => void;
}) => {
  useEffect(() => {
    if (pdfDocument) {
      const { resumeId } = pdfDocument;
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
          "@media (min-width: 1025px)": {
            "&:after": {
              content: pdfDocument?.fileName ? '""' : '" (형태: pdf)"',
            },
          },
          "@media (max-width: 1024px)": {
            "&:after": {
              content: pdfDocument?.fileName ? '""' : '" (pdf)"',
            },
          },
        }}
      >
        {pdfDocument?.fileName || "이력서 및 경력 기술서"}
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
        onClick={onDelete}
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
