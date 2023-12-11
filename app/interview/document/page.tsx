"use client";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Document from "@/components/Element/Document";

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

const DocumentPage = () => {
  const router = useRouter();
  const [document, setDocument] = useState<File | null>(null); // [1] 파일 업로드
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: 700,
            color: COLORS.WHITE,
            lineHeight: "36px",
          }}
        >
          원하는 이력서를 업로드 해주세요
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 400,
            color: COLORS.GRAY100,
            lineHeight: "24px",
          }}
        >
          양식은 상관 없어요. 준비된 이력서를{" "}
          <span className="text-[#00CE72]">PDF 10장 이하</span>로 올려 주세요.
        </Typography>
      </Box>
      <Document />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
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
    </Container>
  );
};

export default DocumentPage;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1040px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
`;
