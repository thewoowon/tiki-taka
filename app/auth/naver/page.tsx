"use client";
import GlobalLoading from "@/components/Element/GlobalLoading";
import useNaverLogin from "@/hooks/useNaverLogin";

const NaverLoginPage = () => {
  const hello = useNaverLogin();

  return <div>{true ? <GlobalLoading /> : <GlobalLoading />}</div>;
};

export default NaverLoginPage;
