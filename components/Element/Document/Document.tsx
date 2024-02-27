import { useEffect, useState } from "react";
import DocumentElement from "./DocumentElement";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Loading } from "@/components/View/Loading";
import styled from "@emotion/styled";
import { ShallowHeader } from "@/components/Layout";
import customAxios from "@/lib/axios";

const Document = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRecoilState] = useRecoilState(userState);
  const [documents, setDocuments] = useState<DocumentPDFType[]>([]);

  const [overLimit, setOverLimit] = useState(false);

  const [isSelected, setIsSelected] = useState<boolean[]>([]);

  const [mode, setMode] = useState<"upload" | "select">("upload");

  // Queries
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["resumes", userRecoilState.userId],
    queryFn: () => {
      return customAxios({
        method: "GET",
        url: "/resume/getResumeList?userId=" + userRecoilState.userId,
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
  });

  const fileDeleteMutation = useMutation({
    mutationFn: (resumeId: number) => {
      return customAxios({
        method: "DELETE",
        url: "/resume/deleteResume",
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

  const deleteOldResumeMutation = useMutation({
    mutationFn: () => {
      return customAxios({
        method: "DELETE",
        url: "/resume/deleteOldResume",
        data: {
          userId: userRecoilState.userId,
        },
      }).then((res) => res.data);
    },
    onSuccess: (data) => {
      toast.success("오래된 이력서 삭제에 성공했어요.");
      refetch();
    },
    onError: (error) => {
      toast.error("오래된 이력서 삭제에 실패했어요. 다시 시도해 주세요.");
    },
  });

  useEffect(() => {
    if (data) {
      setDocuments(data.data ?? []);
      setMode(data.data?.length === 0 ? "upload" : "select");
    }
  }, [data]);

  useEffect(() => {
    setIsSelected(documents.map((document) => false));
  }, [documents]);

  if (isLoading)
    return (
      <Container>
        <CircularProgress
          size={18}
          sx={{
            color: COLORS.WHITE,
          }}
        />
      </Container>
    );

  return (
    <Container>
      {mode === "select" ? (
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
            className="sm:text-[24px] text-[20px]"
          >
            어떤 이력서로 면접을 볼까요?
          </Typography>
        </Box>
      ) : (
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
              "@media (min-width: 1025px)": {
                "&:after": {
                  content: '" 업로드 해주세요."',
                },
              },
              "@media (max-width: 1024px)": {
                fontSize: "20px",
                lineHeight: "28px",
                "&:after": {
                  content: '" 등록해주세요."',
                },
              },
            }}
            className="sm:text-[24px] text-[20px]"
          >
            원하는 이력서를
          </Typography>
          <ScreenHideWrapper>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: COLORS.GRAY100,
                lineHeight: "24px",
              }}
              className="sm:text-[16px] text-[14px]"
            >
              양식은 상관 없어요. 준비된 이력서를{" "}
              <span className="text-[#00CE72]">PDF 5장 이하</span>로 올려
              주세요.
            </Typography>
          </ScreenHideWrapper>
          <ScreenShowWrapper>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 400,
                color: COLORS.GRAY100,
                lineHeight: "24px",
              }}
              className="text-[16px]"
            >
              준비된 이력서를{" "}
              <span className="text-[#00CE72]">PDF 5장 이하</span>로
              등록해주세요.
            </Typography>
          </ScreenShowWrapper>
        </Box>
      )}
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
        {mode === "select" &&
          documents.map((document, index) => (
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
              }}
            />
          ))}
        {mode === "upload" && (
          <>
            <DocumentElement setOverLimit={setOverLimit} refetch={refetch} />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
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
                className="sm:text-[14px] text-[12px]"
              >
                * 파일은 최대 <span className="text-[#00CE72]">50MB</span> 까지
                업로드 하실 수 있어요.
              </Typography>
              <ScreenHideWrapper>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "21px",
                    color: COLORS.GRAY100,
                  }}
                  className="sm:text-[14px] text-[12px]"
                >
                  * 이력서 및 경력기술서는 자유양식이며,{" "}
                  <span className="text-[#00CE72]">한개의 파일로 통합</span>해서
                  올려주세요.
                </Typography>
              </ScreenHideWrapper>
              <ScreenShowWrapper>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 400,
                    lineHeight: "21px",
                    color: COLORS.GRAY100,
                  }}
                  className="sm:text-[14px] text-[12px]"
                >
                  * 이력서는 자유양식이며,{" "}
                  <span className="text-[#00CE72]">한개의 파일로 통합</span>하여
                  등록해주세요.
                </Typography>
              </ScreenShowWrapper>
            </Box>
          </>
        )}
        {mode === "select" && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "30px",
              minWidth: "393px",
              "@media (max-width: 768px)": {
                position: "absolute",
                bottom: "10px",
                width: "100%",
                padding: "0 20px",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
              },
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
                backgroundColor: COLORS.DARK_BG + " !important",
                color: COLORS.WHITE,
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "16px",
                width: "155px",
                height: "52px",
              }}
              onClick={() => {
                if (documents.length >= PDF_FILE_COUNT_LIMIT) handleOpen();
                else setMode("upload");
              }}
              id="document-upload-button"
            >
              새 이력서 등록
            </Button>
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
                width: "155px",
              }}
              onClick={() => {
                const selectedIndex = isSelected.indexOf(true);

                if (selectedIndex === -1) {
                  toast.error("이력서를 선택해주세요.");
                  return;
                }
                router.push(
                  "/interview/upload?resumeId=" +
                    documents[selectedIndex].resumeId,
                  undefined
                );
              }}
              id="document-select-button"
            >
              이력서 선택
            </Button>
          </Box>
        )}

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
                "@media (max-width: 1024px)": {
                  fontSize: "20px",
                },
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
              이력서를 삭제하고
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
                  // 스펙변경
                  // deleteOldResumeMutation.mutate();

                  // const selectedIndex = isSelected.indexOf(true);

                  // if (selectedIndex === -1) {
                  //   toast.error("이력서를 선택해주세요.");
                  //   return;
                  // }

                  // fileDeleteMutation.mutate(
                  //   documents[selectedIndex].resumeId ?? 0
                  // );
                  // handleClose();
                  router.push("/mypage");
                }}
              >
                네
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
      <ShallowHeader />
    </Container>
  );
};

export default Document;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 100);
  max-width: 1040px;
  width: 100%;
  gap: 40px;
  margin: 0 auto;
  padding: 0 20px;
  min-width: 393px;
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
