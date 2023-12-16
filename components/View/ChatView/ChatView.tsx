import {
  Box,
  Button,
  CircularProgress,
  Modal,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import Send from "@/public/svg/send.svg";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { COLORS } from "@/style/color";
import Interviewer from "@/public/svg/interviewer.svg";
import TikitakaBlackLogo from "@/public/svg/tikitaka-black-logo.svg";
import { useRouter } from "next/navigation";
import { modalStyle } from "@/style/modal";

type FormType = {
  chat: string;
};

const ChatView = ({
  interviewId,
  questions,
  indicator,
  setIndicator,
}: {
  interviewId: number;
  questions: QuestionType[];
  indicator: number;
  setIndicator: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, getValues, watch, setValue, handleSubmit } =
    useForm<FormType>({
      defaultValues: {
        chat: "",
      },
    });

  const [chatStack, setChatStack] = useState<QuestionType[]>([]);

  const onSubmit = () => {
    const { chat } = getValues();

    const newQuestion1: QuestionType = {
      role: "user",
      interviewId: 0,
      qaId: 0,
      question: "",
      answer: chat,
      regDate: new Date().toISOString().slice(0, 10),
      modifyDate: new Date().toISOString().slice(0, 10),
    };
    const newQuestion2: QuestionType = {
      role: "ai",
      interviewId: 0,
      qaId: 0,
      question: "",
      answer:
        "사용자 답변을 더 나은 표현으로 바꿔주는 답변 코칭 내용이 들어갑니다.",
      regDate: new Date().toISOString().slice(0, 10),
      modifyDate: new Date().toISOString().slice(0, 10),
    };
    setValue("chat", "");
    setChatStack([...chatStack, newQuestion1, newQuestion2]);
    setIndicator(indicator + 1);
  };

  useEffect(() => {
    setChatStack([...chatStack, questions[indicator]]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indicator, questions]);

  return (
    <Container>
      <Answer>
        {chatStack.length > 0
          ? chatStack.map((m, index) => {
              if (!m) return;
              return m.role === "user" ? (
                <div key={index} className="w-full flex justify-end">
                  <UserChatBox>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                        color: COLORS.WHITE,
                      }}
                    >
                      {m.answer}
                    </Typography>
                  </UserChatBox>
                </div>
              ) : m.role === "interviewer" ? (
                <div key={index} className="w-full flex flex-col gap-[10px]">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      gap: "10px",
                      color: COLORS.WHITE,
                    }}
                  >
                    <Interviewer />
                    {"카카오페이 면접관"}
                  </Box>
                  <AiChatBox>
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "400",
                        lineHeight: "24px",
                        color: COLORS.WHITE,
                      }}
                    >
                      {m.question}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        sx={{
                          display: "flex",
                          padding: "8px 10px",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "10px",
                          borderRadius: "5px",
                          border: `1px solid ${COLORS.GRAY200}`,
                          fontSize: "13px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "24px",
                          color: `${COLORS.GRAY100}`,
                          ":disabled": {
                            backgroundColor: COLORS.GRAY400,
                          },
                        }}
                        onClick={() => {
                          if (questions.length == indicator + 1) {
                            handleOpen();
                          } else {
                            setIndicator(indicator + 1);
                          }
                        }}
                        disabled={chatStack.length !== index + 1}
                      >
                        질문 넘기기
                      </Button>
                    </Box>
                  </AiChatBox>
                </div>
              ) : null;
              // <div key={index} className="w-full flex flex-col gap-[10px]">
              //   <Box
              //     sx={{
              //       display: "flex",
              //       alignItems: "center",
              //       justifyContent: "flex-start",
              //       gap: "10px",
              //     }}
              //   >
              //     <TikitakaBlackLogo />
              //   </Box>
              //   <AiChatBox className="flex flex-col gap-[4px]">
              //     <Box
              //       sx={{
              //         display: "flex",
              //         justifyContent: "flex-start",
              //         alignItems: "center",
              //         gap: "4px",
              //       }}
              //     >
              //       <svg
              //         width="78"
              //         height="14"
              //         viewBox="0 0 78 14"
              //         fill="none"
              //         xmlns="http://www.w3.org/2000/svg"
              //       >
              //         <path
              //           d="M47.8433 12.6343L45.1018 10.1787C45.1018 10.1787 46.4473 9.32091 47.6246 7.85766L45.1018 7.94175L44.9336 5.18344L49.1047 5.31799C49.2224 4.99843 49.3065 4.66205 49.3738 4.30885L45.5223 4.5275V1.26462H53.7131C53.7131 8.73225 47.8433 12.6343 47.8433 12.6343ZM54.0327 0.322754H58.6373V4.56114L59.9997 4.49386V8.93407L58.6373 8.88362V13.677C57.9478 13.6434 57.2918 13.6266 56.7368 13.6266C55.6267 13.6266 54.8867 13.677 54.8867 13.677H54.8026V2.2233L54.0327 0.322754Z"
              //           fill="white"
              //         />
              //         <path
              //           d="M33.1586 12.096C30.7198 12.096 29.6602 11.1205 29.6602 9.11908V3.13152L28.8398 1.26462H37.7165V4.10703L33.5118 3.97247V5.08253L37.7334 4.94797L37.5652 7.70629L33.5118 7.58856V8.19404C33.5118 8.7827 33.7641 8.83316 34.1677 8.83316C35.6983 8.83316 37.952 8.66497 37.952 8.66497L37.8174 12.096H33.1586ZM38.1706 0.322754H42.7753V4.56114L44.1376 4.49386V8.93407L42.7753 8.88362V13.677C40.6729 13.5761 38.9406 13.677 38.9406 13.677V2.2233L38.1706 0.322754Z"
              //           fill="white"
              //         />
              //         <path
              //           d="M17.5181 12.6343L14.7766 10.1787C14.7766 10.1787 16.1221 9.32091 17.2994 7.85766L14.7766 7.94175L14.6084 5.18344L18.7795 5.31799C18.8972 4.99843 18.9813 4.66205 19.0486 4.30885L15.1971 4.5275V1.26462H23.3879C23.3879 8.73225 17.5181 12.6343 17.5181 12.6343ZM23.7075 0.322754H28.3121V13.677C27.6226 13.6434 26.9666 13.6266 26.4116 13.6266C25.3015 13.6266 24.5615 13.677 24.5615 13.677H24.4774V2.2233L23.7075 0.322754Z"
              //           fill="white"
              //         />
              //         <path
              //           d="M4.31874 12.096C1.87999 12.096 0.820393 11.1205 0.820393 9.11908V3.13152L0 1.26462H8.87669V4.10703L4.67194 3.97247V5.08253L8.89351 4.94797L8.72532 7.70629L4.67194 7.58856V8.19404C4.67194 8.7827 4.92423 8.83316 5.32788 8.83316C6.85841 8.83316 9.11215 8.66497 9.11215 8.66497L8.9776 12.096H4.31874ZM9.3308 0.322754H13.9355V13.677C11.8331 13.5761 10.1007 13.677 10.1007 13.677V2.2233L9.3308 0.322754Z"
              //           fill="white"
              //         />
              //         <path
              //           fill-rule="evenodd"
              //           clip-rule="evenodd"
              //           d="M72.4 0H69.6V3.6201L67.0402 1.0603L65.0603 3.0402L67.6201 5.6H64V8.4H67.6201L65.0603 10.9598L67.0402 12.9397L69.6 10.3799V14H72.4V10.3799L74.9598 12.9397L76.9397 10.9598L74.3799 8.4H78V5.6H74.3799L76.9397 3.0402L74.9598 1.0603L72.4 3.6201V0Z"
              //           fill="#00CE72"
              //         />
              //       </svg>
              //       <Typography
              //         sx={{
              //           fontSize: "16px",
              //           fontStyle: "normal",
              //           fontWeight: "600",
              //           lineHeight: "24px",
              //           color: COLORS.WHITE,
              //         }}
              //       >
              //         답변 코칭
              //       </Typography>
              //     </Box>
              //     <Typography
              //       sx={{
              //         fontSize: "16px",
              //         fontStyle: "normal",
              //         fontWeight: "400",
              //         lineHeight: "24px",
              //         color: COLORS.WHITE,
              //       }}
              //     >
              //       {m.answer}
              //     </Typography>
              //   </AiChatBox>
              // </div>
            })
          : "null"}
      </Answer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            color: COLORS.TIKI_GREEN,
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "24px",
          }}
        >
          {`(현재 ${watch("chat").length}자 / 최대 150자)`}
        </Box>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="면접 답변을 입력해주세요"
            required
            autoComplete="off"
            {...register("chat")}
          />
          <button type="submit" disabled={false}>
            {false ? (
              <CircularProgress
                size={20}
                color="info"
                style={{
                  color: "#333",
                }}
              />
            ) : (
              <Send fill={"#800080"} />
            )}
          </button>
        </Form>
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
            면접을 종료할까요?
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
            면접 내용은 히스토리에서 확인이 가능해요
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
                router.push("/interview/result");
                handleClose();
              }}
            >
              종료
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
              계속 진행
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default ChatView;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 32px 32px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 104px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
`;

const Answer = styled.div`
  padding: 20px 0;
  font-size: 16px;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  placeholder {
    color: #333333;
  }
  resize: none;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 20px;
`;

const Form = styled.form`
  width: 100%;
  max-height: 200px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  border-radius: 5px;
  border: 1px solid ${COLORS.TIKI_GREEN};
  background: ${COLORS.DARK_BG};
  padding: 16px 20px;
  input {
    flex: 1;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.1);
    font-size: 16px;
    &:focus {
      outline: none;
    }
    background-color: transparent;
    color: ${COLORS.GRAY100};
    &::placeholder {
      color: ${COLORS.GRAY100};
    }
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
`;

const UserChatBox = styled.div`
  width: 100%;
  border-radius: 20px 0px 20px 20px;
  background: ${COLORS.TIKI_GREEN};
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  padding: 20px 24px;
`;

const AiChatBox = styled.div`
  width: 100%;
  border-radius: 0px 20px 20px 20px;
  background: ${COLORS.DARK_BG};
  color: #333;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 150% */
  padding: 30px;
`;
