import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Hamburger from "@/public/svg/hamburger.svg";
import { COLORS } from "@/style/color";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { loginState, modalState } from "@/states";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Link from "next/link";
import TikitakaTextMobile from "@/components/svg/TikitakaTextMobile";
import TikitakaLogoSmall from "@/public/svg/tikitaka-logo-small.svg";

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  { pathname: "/article", label: "취업 아티클" },
];

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const [pathObj, setPathObj] = useState<{
    pathname: string;
    label: string;
  }>({
    pathname: "/auth/kakao",
    label: "로그인",
  });
  const [state, setState] = useRecoilState(modalState);

  const [isLoggedIn] = useRecoilState(loginState);

  useEffect(() => {
    if (isLoggedIn) {
      setPathObj({ pathname: "/mypage", label: "마이페이지" });
    } else {
      setPathObj({ pathname: "/auth/kakao", label: "로그인" });
    }
  }, [isLoggedIn]);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        padding: "30px 20px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      display={"flex"}
      justifyContent={"center"}
    >
      <Ul>
        {CONSTANT_ROUTER.map((item) => (
          <li
            key={item.pathname}
            onClick={() => router.push(item.pathname)}
            className={pathname.startsWith(item.pathname) ? "active" : ""}
          >
            {item.label}
          </li>
        ))}
        <li
          onClick={() => router.push(pathObj.pathname)}
          className={pathname.startsWith(pathObj.pathname) ? "active" : ""}
        >
          {pathObj.label}
        </li>
      </Ul>
    </Box>
  );

  return (
    <Container>
      <HamburgerButton onClick={toggleDrawer("top", !state["top"])}>
        <Hamburger />
      </HamburgerButton>
      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
        sx={{
          "@media (min-width: 1024px)": {
            display: "none",
          },
          ".MuiDrawer-paper": {
            backgroundColor: COLORS.DARK_BG,
            fontFamily: "Pretendard Variable",
            color: COLORS.WHITE,
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              borderBottom: "1px solid " + COLORS.LIGHT_BG,
              padding: "20px",
            }}
          >
            <MobileLogo
              onClick={() => {
                setState({ ...state, top: false });
                router.push("/");
              }}
            >
              <TikitakaTextMobile color={COLORS.WHITE} />
              <TikitakaLogoSmall />
            </MobileLogo>
            <HamburgerButton onClick={toggleDrawer("top", !state["top"])}>
              <Hamburger />
            </HamburgerButton>
          </Box>
          {list("top")}
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"6px"}
          bottom={"30px"}
          padding={"20px"}
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.00065 15.1666C7.02572 15.1666 8.66732 13.525 8.66732 11.5C8.66732 9.47491 7.02572 7.83331 5.00065 7.83331C2.9756 7.83331 1.33398 9.47491 1.33398 11.5C1.33398 12.1678 1.51254 12.794 1.82452 13.3333L1.51732 14.9833L3.16732 14.6761C3.70664 14.9881 4.33279 15.1666 5.00065 15.1666Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10.1881 12.4318C10.839 12.327 11.4504 12.1043 11.9999 11.7864L14.3999 12.2333L13.953 9.83331C14.4068 9.04885 14.6665 8.13805 14.6665 7.16665C14.6665 4.22113 12.2787 1.83331 9.33321 1.83331C6.64829 1.83331 4.42676 3.8173 4.05469 6.39921"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Typography fontSize={16} color={COLORS.WHITE} fontWeight={400}>
            <Link
              href={"https://open.kakao.com/o/sUonPQYf"}
              className="cursor-pointer hover:text-white"
              target="_blank"
            >
              고객센터
            </Link>
          </Typography>
        </Box>
      </Drawer>
    </Container>
  );
}

const Container = styled.div`
  @media (min-width: 1024px) {
    display: none;
  }
`;

const HamburgerButton = styled(Button)`
  min-width: auto !important;
  display: flex;
  padding: 0;
`;

const Ul = styled.ul`
  color: ${COLORS.WHITE};
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  gap: 30px;

  .active {
    color: ${COLORS.TIKI_GREEN};
  }

  li {
    cursor: pointer;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${COLORS.TIKI_GREEN};
    }
  }
`;

const MobileLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 900;
  color: #fff;
  display: absolute;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  @media (max-width: 1024px) {
    display: flex;
  }
`;
