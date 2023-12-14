import { useRef, useState } from "react";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import { Box, Button, Modal, Typography } from "@mui/material";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import SimpleDocumentElement from "./SimpleDocumentElement";
import styled from "@emotion/styled";

const SimpleDocument = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [documents, setDocuments] = useState<
    {
      id: number;
      source: File | null;
      name: string;
    }[]
  >([
    {
      id: 1,
      source: null,
      name: "망한 원티드 이력서.pdf",
    },
    {
      id: 2,
      source: null,
      name: "LG 공채용 이력서 v1.pdf",
    },
  ]);

  const [overLimit, setOverLimit] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);

  const [file, setFile] = useState<File | null>(null);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "40px",
      }}
    >
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
          <SimpleDocumentElement
            key={index}
            pdfDocument={document}
            onDelete={(id: number) => {
              setSelectedDocument(id);
              handleOpen();
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1040px",
          gap: "10px",
        }}
      >
        <Box>
          {overLimit && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "2px",
                color: COLORS.ERROR_RED,
                marginBottom: "10px",
              }}
            >
              <svg
                width="14"
                height="15"
                viewBox="0 0 14 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.99935 13.8366C3.77769 13.8366 1.16602 11.2249 1.16602 8.00326C1.16602 4.78159 3.77769 2.16992 6.99935 2.16992C10.221 2.16992 12.8327 4.78159 12.8327 8.00326C12.8327 11.2249 10.221 13.8366 6.99935 13.8366ZM6.99935 12.6699C9.57669 12.6699 11.666 10.5806 11.666 8.00326C11.666 5.42593 9.57669 3.33659 6.99935 3.33659C4.42202 3.33659 2.33268 5.42593 2.33268 8.00326C2.33268 10.5806 4.42202 12.6699 6.99935 12.6699ZM6.41602 9.75326H7.58268V10.9199H6.41602V9.75326ZM6.41602 5.08659H7.58268V8.58659H6.41602V5.08659Z"
                  fill="#FF3636"
                />
              </svg>

              <Typography>파일 용량 50MB 이내로 올려 주세요.</Typography>
            </Box>
          )}
        </Box>
        <Button
          sx={{
            display: "flex",
            padding: "18px 24px",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            flexShrink: 0,
            backgroundColor:
              documents.length >= PDF_FILE_COUNT_LIMIT
                ? COLORS.GRAY400 + " !important"
                : COLORS.TIKI_GREEN + " !important",
            color: COLORS.WHITE,
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "16px",
          }}
          onClick={() => {
            inputRef.current?.click();
          }}
          disabled={documents.length >= PDF_FILE_COUNT_LIMIT}
        >
          업로드
        </Button>
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
              setDocuments([
                ...documents,
                {
                  id: documents.length + 1,
                  source: file,
                  name: file.name,
                },
              ]);
            }
          }}
        />
      </Box>
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
            {"{파일 이름}"}
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
            이력서 파일을 정말 삭제할까요?
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
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                color: COLORS.TIKI_GREEN,
              }}
              onClick={handleClose}
            >
              아니오
            </Button>
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
                setDocuments(
                  documents.filter(
                    (document) => document.id !== selectedDocument
                  )
                );
                handleClose();
              }}
            >
              네
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SimpleDocument;

const FileInput = styled.input`
  display: none;
`;
