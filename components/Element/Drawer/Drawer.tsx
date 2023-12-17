import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import Hamburger from "@/public/svg/hamburger.svg";
import { COLORS } from "@/style/color";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { loginState } from "@/states";
import { useEffect } from "react";

const CONSTANT_ROUTER = [
  { pathname: "/interview", label: "AI 면접" },
  { pathname: "/history", label: "히스토리" },
];

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer() {
  const router = useRouter();
  const pathname = usePathname();
  const [pathObj, setPathObj] = React.useState<{
    pathname: string;
    label: string;
  }>({
    pathname: "/auth/kakao",
    label: "로그인",
  });
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
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
      <HamburgerButton onClick={toggleDrawer("right", true)}>
        <Hamburger />
      </HamburgerButton>
      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        sx={{
          ".MuiDrawer-paper": {
            backgroundColor: COLORS.DARK_BG,
            marginTop: "60px",
            fontFamily: "Pretendard Variable",
            color: COLORS.WHITE,
            width: "250px",
            padding: "30px",
          },
        }}
      >
        {list("right")}
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
`;

const Ul = styled.ul`
  color: ${COLORS.WHITE};
  font-weight: 400;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  list-style: none;
  gap: 30px;

  .active {
    color: ${COLORS.TIKI_GREEN};
  }

  li {
    cursor: pointer;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    transition: color 0.2s ease-in-out;
    &:hover {
      color: ${COLORS.TIKI_GREEN};
    }
  }
`;
