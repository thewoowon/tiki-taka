import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";

const DocumentElement = ({
  pdfDocument,
  isSelected,
  onSelected,
  setOverLimit,
}: {
  pdfDocument?: {
    source: File | null;
    name: string;
  };
  isSelected?: boolean;
  onSelected?: () => void;
  setOverLimit?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        {pdfDocument?.name || file?.name || "이력서 및 경력 기술서 (형태: pdf)"}
      </Typography>
      {pdfDocument ? (
        <Box
          onClick={() => {
            onSelected?.();
          }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {isSelected ? (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10.25"
                fill="#1D1D1D"
                stroke="#00CE72"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="6" fill="#00CE72" />
            </svg>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10.25"
                fill="#3E3E3E"
                stroke="#B9B9B9"
                strokeWidth="1.5"
              />
              <circle cx="12" cy="12" r="6" fill="#B9B9B9" />
            </svg>
          )}
        </Box>
      ) : (
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
              backgroundColor: COLORS.LIGHT_BG,
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
          <FileInput
            ref={inputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // file size check 50MB
                if (file.size > 50 * 1024 * 1024) {
                  setOverLimit?.(true);
                  return;
                }

                setFile(file);
              }
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography
                sx={{
                  fontSize: "23px",
                  color: COLORS.WHITE,
                  fontWeight: 700,
                }}
              >
                이력서는 최대 3개까지 저장 가능해요
              </Typography>
              <Typography
                sx={{
                  color: COLORS.GRAY100,
                  textAlign: "center",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "24px",
                }}
              >
                가장 오래된 이력서를 삭제하고
                <br />
                새로운 이력서를 업로드 하시겠어요?
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "20px",
                  pt: "20px",
                }}
              >
                <Button
                  sx={{
                    display: "flex",
                    width: "145px",
                    padding: "18px 20px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    flexShrink: 0,
                    backgroundColor: COLORS.TIKI_GREEN + " !important",
                    color: COLORS.WHITE,
                  }}
                  onClick={() => {
                    handleClose();
                  }}
                >
                  확인
                </Button>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default DocumentElement;

const FileInput = styled.input`
  display: none;
`;
