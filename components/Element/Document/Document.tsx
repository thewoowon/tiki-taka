import { useEffect, useState } from "react";
import DocumentElement from "./DocumentElement";
import { PDF_FILE_COUNT_LIMIT } from "@/constants/limit";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/style/color";
import { modalStyle } from "@/style/modal";
import toast from "react-hot-toast";
import { useRecoilState } from "recoil";
import { userState } from "@/states";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Loading } from "@/components/View/Loading";

const Document = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userRecoilState] = useRecoilState(userState);
  const [documents, setDocuments] = useState<DocumentPDFType[]>([]);

  const [overLimit, setOverLimit] = useState(false);

  const [isSelected, setIsSelected] = useState<boolean[]>([]);

  // Queries
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["resumes", userRecoilState.userId],
    queryFn: () => {
      return axios({
        method: "GET",
        url:
          "https://tikitakachatdata.com/resume/getResumeList?userId=" +
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

  const fileDeleteMutation = useMutation({
    mutationFn: (resumeId: number) => {
      return axios({
        method: "DELETE",
        url: "https://tikitakachatdata.com/resume/deleteResume",
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

  const deleteOldResumeMutation = useMutation({
    mutationFn: () => {
      return axios({
        method: "DELETE",
        url: "https://tikitakachatdata.com/resume/deleteOldResume",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
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
    }
  }, [data]);

  useEffect(() => {
    setIsSelected(documents.map((document) => false));
  }, [documents]);

  if (isLoading) {
    return (
      <Loading
        title={"이력서 불러오는 중"}
        description={`${userRecoilState.nickname}(카카오 연동)님의 경험과 채용 공고를 바탕으로 면접 질문을 만들고 있어요.`}
      />
    );
  }

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
          }}
        />
      ))}
      {PDF_FILE_COUNT_LIMIT - documents.length > 0 && (
        <DocumentElement setOverLimit={setOverLimit} refetch={refetch} />
      )}

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
        >
          * 파일은 최대 <span className="text-[#00CE72]">50MB</span> 까지 업로드
          하실 수 있어요.
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
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
            visibility:
              documents.length === PDF_FILE_COUNT_LIMIT ? "visible" : "hidden",
          }}
          onClick={handleOpen}
        >
          원하는 이력서가 없어요
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
            visibility: documents.length > 0 ? "visible" : "hidden",
          }}
          onClick={() => {
            const selectedIndex = isSelected.indexOf(true);

            if (selectedIndex === -1) {
              toast.error("이력서를 선택해주세요.");
              return;
            }
            router.push(
              "/interview/upload?resumeId=" + documents[selectedIndex].resumeId,
              undefined
            );
          }}
        >
          이력서 선택
        </Button>
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
  );
};

export default Document;
