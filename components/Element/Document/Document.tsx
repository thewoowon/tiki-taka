import { useEffect, useState } from "react";
import DocumentElement from "./DocumentElement";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/style/color";

const style = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 429,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "30px 40px",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "20px",
  backgroundColor: COLORS.LIGHT_BG,
};

const Document = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [documents, setDocuments] = useState<
    {
      source: File | null;
      name: string;
    }[]
  >([
    {
      source: null,
      name: "망한 원티드 이력서.pdf",
    },
    {
      source: null,
      name: "LG 공채용 이력서 v1.pdf",
    },
  ]);

  const [overLimit, setOverLimit] = useState(false);

  const [isSelected, setIsSelected] = useState<boolean[]>([]);

  useEffect(() => {
    setIsSelected(documents.map((document) => false));
  }, [documents]);

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
        <DocumentElement
          key={index}
          pdfDocument={document}
          isSelected={isSelected[index]}
          onSelected={() => {
            // 전체를 false로 만들고, 해당 index만 true로 만든다.
            setIsSelected(isSelected.map(() => false));
            setIsSelected((prev) => {
              const newSelected = [...prev];
              newSelected[index] = true;
              return newSelected;
            });

            router.push("/interview/analysis?document=" + index, undefined);
          }}
        />
      ))}
      {PDF_FILE_COUNT_LIMIT - documents.length > 0 && (
        <DocumentElement setOverLimit={setOverLimit} />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
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
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "21px",
              color: COLORS.GRAY100,
            }}
          >
            * 파일은 최대 <span className="text-[#00CE72]">50MB</span> 까지
            업로드 하실 수 있어요.
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "21px",
              color: COLORS.GRAY100,
            }}
          >
            * 이력서 및 경력기술서는 자유양식이며,{" "}
            <span className="text-[#00CE72]">한개의 파일로 통합</span>하여
            올려주세요.
          </Typography>
        </Box>
        {documents.length === PDF_FILE_COUNT_LIMIT && (
          <Button
            sx={{
              display: "flex",
              padding: "18px 24px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              backgroundColor: COLORS.TIKI_GREEN + " !important",
              color: COLORS.WHITE,
              fontSize: "16px",
              fontWeight: 600,
              lineHeight: "16px",
            }}
            onClick={handleOpen}
          >
            원하는 이력서가 없어요
          </Button>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                router.push("/interview/document");
                handleClose();
              }}
            >
              네
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
                border: `1px solid ${COLORS.TIKI_GREEN}`,
                color: COLORS.TIKI_GREEN,
              }}
              onClick={handleClose}
            >
              아니오
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Document;
