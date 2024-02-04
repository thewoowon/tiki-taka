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
      <ScreenHideWrapper>
        <Button
          sx={{
            display: "flex",
            padding: "3px 7px",
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
      </ScreenHideWrapper>
      <ScreenShowWrapper>
        <Box
          sx={{
            width: "24px",
            height: "24px",
            display: "flex",
            padding: 0,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              "& svg": {
                "& path": {
                  fill: COLORS.TIKI_GREEN,
                },
              },
            },
          }}
          onClick={onDelete}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0007 10.5865L16.9505 5.63672L18.3647 7.05093L13.4149 12.0007L18.3647 16.9504L16.9505 18.3646L12.0007 13.4149L7.05094 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05094 5.63672L12.0007 10.5865Z"
              fill="#B9B9B9"
            />
          </svg>
        </Box>
      </ScreenShowWrapper>
    </Box>
  );
};

export default SimpleDocumentElement;

const FileInput = styled.input`
  display: none;
`;

const ScreenHideWrapper = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const ScreenShowWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
`;
