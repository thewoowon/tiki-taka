import customAxios from "@/lib/axios";
import { loginState, userState } from "@/states";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [, setIsLoggedIn] = useRecoilState(loginState);
  const [, setUserState] = useRecoilState(userState);
  const [, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const result = await customAxios({
        method: "GET",
        url: `/user/cookie`,
      })
        .then((res) => {
          return res;
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          setIsLoggedIn(false);
          setUserState({
            email: "",
            profileImage: "",
            nickname: "",
            userId: null,
          });
          return err.response;
        });
      if (result?.status !== 200) {
        setIsLoading(false);
      }
    }

    checkLogin();
  }, [setIsLoggedIn, setUserState]);

  return children;
};

export default AuthProvider;
