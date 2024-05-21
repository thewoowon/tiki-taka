import { COLORS } from "./color";

export const modalStyle = {
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
  "@media (max-width: 1024px)": {
    width: 353,
    padding: "30px 20px",
  },
  "&:focus": {
    outline: "none",
  },
};

export const bottomModalStyle = {
  position: "absolute" as "absolute",
  top: "auto",
  bottom: 0,
  transform: "translate(-50%, 0)",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: "20px",
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "20px 20px 0 0",
  backgroundColor: COLORS.LIGHT_BG,
  height: "510px",
};
