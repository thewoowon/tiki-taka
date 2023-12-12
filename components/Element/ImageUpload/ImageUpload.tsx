import { useState } from "react";
import ImageUploadElement from "./ImageUploadElement";
import { Box, Button, Modal, Typography } from "@mui/material";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";

const ImageUpload = ({
  open,
  onClose,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  onChange: (file: File) => void;
}) => {
  const [overLimit, setOverLimit] = useState(false);

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
      <ImageUploadElement setOverLimit={setOverLimit} onChange={onChange} />
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
        </Box>
      </Box>
      <Modal
        open={open}
        onClose={onClose}
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
            이력서 분석이 불가능해요.
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
            잠시 후 다시 시도해주세요.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              pt: "20px",
              width: "100%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                width: "100%",
                padding: "18px 20px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexShrink: 0,
                backgroundColor: COLORS.TIKI_GREEN + " !important",
                color: COLORS.WHITE,
              }}
              onClick={() => {
                onClose();
              }}
            >
              확인
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUpload;
