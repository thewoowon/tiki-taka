import { useEffect, useRef, useState } from "react";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import SimpleDocumentElement from "./SimpleDocumentElement";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@/components/View/Loading";
import ExclamationMark2 from "@/public/svg/exclamation-mark-2.svg";
import { SimulationQLoading } from "../Loading";

const SimpleDocument = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRecoilState] = useRecoilState(userState);
  const [documents, setDocuments] = useState<DocumentPDFType[]>([]);

  const [overLimit, setOverLimit] = useState(false);

  const [selectedDocument, setSelectedDocument] = useState<number | null>(null);

  // Queries
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["resumes", userRecoilState.userId],
    queryFn: () => {
      return axios({
        method: "GET",
        url:
          "https://api.tikitaka.chat/resume/getResumeList?userId=" +
          userRecoilState.userId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
  });

  const fileUploadMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("file", file);
      if (!userRecoilState.userId)
        throw new Error("userRecoilState.userId is null");
      formData.append("userId", userRecoilState.userId.toString());
      return axios({
        method: "POST",
        url: "https://api.tikitaka.chat/resume/uploadResume",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: formData,
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      if (data.code === "200") toast.success("이력서 업로드에 성공했어요.");
      else toast.error(data.message);
      refetch?.();
    },
    onError: (error) => {
      toast.error("이력서 업로드에 실패했어요. 다시 시도해 주세요.");
    },
  });

  const fileDeleteMutation = useMutation({
    mutationFn: (resumeId: number) => {
      return axios({
        method: "DELETE",
        url: "https://api.tikitaka.chat/resume/deleteResume",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: {
          resumeId,
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.success("이력서 삭제에 성공했어요.");
      refetch();
    },
    onError: (error) => {
      toast.error("이력서 삭제에 실패했어요. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (data) {
      setDocuments(data.data ?? []);
    }
  }, [data]);

  if (isLoading)
    return (
      <CircularProgress
        size={18}
        sx={{
          color: COLORS.WHITE,
        }}
      />
    );

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "40px",
        minHeight: "280px",
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
        {documents.length > 0 ? (
          documents.map((document, index) => (
            <SimpleDocumentElement
              key={index}
              pdfDocument={document}
              onDelete={() => {
                setSelectedDocument(document.resumeId);
                handleOpen();
              }}
            />
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
            }}
          >
            <ExclamationMark2 />
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: COLORS.GRAY100,
                lineHeight: "24px",
                textAlign: "center",
              }}
            >
              아직 등록된 이력서가 없어요.
              <br />
              면접을 위해 이력서를 등록해 주세요.
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          maxWidth: "1040px",
          gap: "10px",

          "@media (max-width: 1024px)": {
            gap: "0",
          },
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

            "@media (max-width: 1024px)": {
              width: "100%",
            },
          }}
          onClick={() => {
            inputRef.current?.click();
          }}
          disabled={documents.length >= PDF_FILE_COUNT_LIMIT}
        >
          {fileUploadMutation.isPending ? (
            <CircularProgress
              size={18}
              sx={{
                color: COLORS.WHITE,
              }}
            />
          ) : (
            "새 이력서 등록"
          )}
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
              fileUploadMutation.mutate(file);
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
            {selectedDocument &&
              documents.find((d) => d.resumeId === selectedDocument)?.fileName}
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
                fileDeleteMutation.mutate(selectedDocument ?? 0);
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
