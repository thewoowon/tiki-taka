"use client";
import Typography from "@/components/Element/Typography";
import { COLORS } from "@/style/color";
import styled from "@emotion/styled";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  const downloadFile = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
  };

  return (
    <FooterContainer className="min-h-[411px]">
      <Wrapper>
        <Flex direction="column" gap={30} align="flex-start">
          <Image
            src={"/svg/tikitaka-main.svg"}
            alt=""
            width={160}
            height={50}
          />
          <Flex gap={6}>
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
            <Typography fontSize={16} color={COLORS.GRAY200}>
              <Link
                href={"https://open.kakao.com/o/sUonPQYf"}
                className="cursor-pointer hover:text-white"
                target="_blank"
              >
                고객센터
              </Link>
            </Typography>
          </Flex>
          <Flex gap={16} direction="column" align="flex-start">
            <Typography fontSize={16}>스톤즈랩</Typography>
            <Flex gap={4} direction="column" align="flex-start">
              <Typography fontSize={13} color={COLORS.GRAY200}>
                사업자 등록번호 : 225-52-00817 | 대표 : 정진협 |{" "}
                <Link
                  href={"http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2255200817"}
                  style={{ color: COLORS.TIKI_GREEN }}
                  target="_blank"
                  className="cursor-pointer hover:text-white underline"
                >
                  사업자정보확인
                </Link>
              </Typography>
              <Typography fontSize={13} color={COLORS.GRAY200}>
                서울특별시 서초구 사평대로26길 62, 301호(반포동 삼익아트빌라)
              </Typography>
              <Typography fontSize={13} color={COLORS.GRAY200}>
                통신판매업 신고번호 : 2023-서울서초-3908
              </Typography>
              <Typography fontSize={13} color={COLORS.GRAY200}>
                개인정보보호책임자 : 정진협
              </Typography>
            </Flex>
            <Typography fontSize={14} color={COLORS.GRAY200}>
              contact us. <br />
              <Link
                href={"mailto:chat.tikitaka@gmail.com"}
                className="cursor-pointer hover:text-white"
              >
                chat.tikitaka
                <span style={{ color: COLORS.TIKI_GREEN }}>@</span>
                gmail.com
              </Link>
            </Typography>
            <Flex gap={8}>
              <Typography
                fontSize={11}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_terms_of_use.pdf",
                    "tikitaka_terms_of_use.pdf"
                  );
                }}
              >
                이용약관
              </Typography>
              <Typography fontSize={11} color={COLORS.GRAY200}>
                |
              </Typography>
              <Typography
                fontSize={11}
                color={COLORS.GRAY200}
                className="cursor-pointer hover:text-white"
                onClick={() => {
                  downloadFile(
                    "https://tikitaka.chat/terms/tikitaka_consent_to_collection_and_use_of_personal_information.pdf",
                    "tikitaka_consent_to_collection_and_use_of_personal_information.pdf"
                  );
                }}
              >
                개인정보처리방침
              </Typography>
            </Flex>
          </Flex>
        </Flex>
      </Wrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  min-height: 411px;
  padding-top: 40px;
  background-color: ${COLORS.DARK_BG};
  position: relative;
  display: none;

  @media (max-width: 1640px) {
    display: block;
  }
`;

const Logo = styled.div`
  font-weight: 900;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const Ul = styled.ul`
  color: white;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  font-family: "Montserrat", sans-serif;
  li {
    margin: 0 1rem;
    cursor: pointer;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #fff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  padding: 0 36px;
`;

const Flex = styled.div<{
  direction?: "row" | "column";
  justify?: "center" | "flex-start" | "flex-end";
  align?: "center" | "flex-start" | "flex-end";
  gap?: number;
}>`
  display: flex;
  align-items: ${(props) => props.align || "center"};
  justify-content: ${(props) => props.justify || "center"};
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || 0}px;
`;
