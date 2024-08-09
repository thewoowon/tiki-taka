import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { COLORS } from "@/style/color";
import Image from "next/image";

const ImageUploadElement = ({
  imageDocument,
  onChange,
  setOverLimit,
}: {
  imageDocument?: {
    source: File | null;
    name: string;
  };
  onChange?: (file: File) => void;
  setOverLimit?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [myUploadUrl, setMyUploadUrl] = useState<string | null>(null);

  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setMyUploadUrl(reader.result?.toString() || "");
        resolve();
      };
    });
  };

  useEffect(() => {
    if (imageDocument) {
      const { source } = imageDocument;
      setFile(source);
    }
  }, [imageDocument]);

  useEffect(() => {
    if (onChange && file) {
      onChange(file);
    }
  }, [file, onChange]);

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
        position: "relative",
      }}
      onMouseEnter={() => {
        divRef.current?.style.setProperty("opacity", "1");
      }}
      onMouseLeave={() => {
        divRef.current?.style.setProperty("opacity", "0");
      }}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.click();
      }}
    >
      <Typography
        sx={{
          fontSize: "16px",
          color: COLORS.GRAY100,
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
          overflow: "hidden",
          maxWidth: "calc(100% - 40px)",
          "@media (min-width: 1025px)": {
            "&:after": {
              content:
                !imageDocument?.name && !file?.name
                  ? '""'
                  : '" (형식: PNG, JPG, JPEG)"',
            },
          },
          "@media (max-width: 1024px)": {
            "&:after": {
              content:
                !imageDocument?.name && file?.name
                  ? '""'
                  : '" (PNG, JPG, JPEG)"',
            },
          },
        }}
      >
        {imageDocument?.name || file?.name || "이미지 업로드"}
      </Typography>

      <Box
        onClick={(e) => {
          e.stopPropagation();
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
          accept="image/png, image/jpeg, image/jpg"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              // file size check 50MB
              if (file.size > 50 * 1024 * 1024) {
                setOverLimit?.(true);
                return;
              }

              setFile(file);

              await encodeFileToBase64(file);
            }
          }}
        />
      </Box>
      <Box
        ref={divRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "120px",
          height: "120px",
          borderRadius: "5px",
          border: `1px solid ${COLORS.TIKI_GREEN}`,
          backgroundColor: COLORS.DARK_BG + " !important",
          position: "absolute",
          right: 0,
          bottom: "calc(100% + 20px)",
          opacity: 0,
          overflow: "hidden",
        }}
      >
        {myUploadUrl && (
          <Image
            src={myUploadUrl}
            width={120}
            height={120}
            alt="my upload url"
            loader={({ src }) => (src ? src : "/assets/black-logo.png")}
          />
        )}
      </Box>
    </Box>
  );
};

export default ImageUploadElement;

const FileInput = styled.input`
  display: none;
`;
