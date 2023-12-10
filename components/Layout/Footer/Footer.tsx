"use client";
import styled from "@emotion/styled";

const Footer = () => {
  return (
    <FooterContainer className="min-h-[321px] pt-[70px]">
      <Wrapper>
        <div className="flex justify-between w-full"></div>
      </Wrapper>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  min-height: 321px;
  padding-top: 70px;
  background-image: url("/svg/tikitaka-main.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: #f3f3f3;
  position: relative;
  z-index: 1;
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
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;
