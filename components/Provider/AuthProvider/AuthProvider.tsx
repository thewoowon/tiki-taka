import { loginState, userState } from "@/states";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(loginState);
  const [, setUserState] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const result = await axios({
        method: "GET",
        url: `https://api.tikitaka.chat/user/cookie`,
        withCredentials: true,
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
  }, []);

  return children;
};

export default AuthProvider;
