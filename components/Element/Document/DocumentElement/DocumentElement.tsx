import React, { useEffect } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/style/color";

const DocumentElement = ({
  document,
}: {
  document?: {
    source: File | null;
    name: string;
  };
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);

  useEffect(() => {
    if (document) {
      const { source } = document;
      setFile(source);
    }
  }, [document]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        maxWidth: "1040px",
        width: "100%",
        height: "56px",
        borderRadius: "5px",
        border: `1px solid ${COLORS.TIKI_GREEN}`,
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
        {document?.name || file?.name || "이력서 및 경력 기술서 (형태: pdf)"}
      </Typography>
      <Box
        onClick={() => {
          inputRef.current?.click();
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5px",
          borderRadius: "50%",
          cursor: "pointer",
          transition: "all 0.2s ease",
          "&:hover": {
            backgroundColor: COLORS.WHITE,
          },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 14V8.5M6 13V6C6 4.34315 7.34315 3 9 3H14"
            stroke="#00CE72"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9922 4H19.9922M19.9922 4H22.9922M19.9922 4V1M19.9922 4V7"
            stroke="#00CE72"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 21H6C3.79086 21 2 19.2091 2 17C2 14.7909 3.79086 13 6 13H17H18C15.7909 13 14 14.7909 14 17C14 19.2091 15.7909 21 18 21C20.2091 21 22 19.2091 22 17V14"
            stroke="#00CE72"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>
      <FileInput
        ref={inputRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setFile(file);
          }
        }}
      />
    </Box>
  );
};

export default DocumentElement;

const FileInput = styled.input`
  display: none;
`;
