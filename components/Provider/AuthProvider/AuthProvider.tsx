import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import customAxios from "@/lib/axios";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setIsAuthenticated } = useAuth();
  const { setUser } = useUser();
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
          setIsAuthenticated(false);
          setUser({
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
  }, [setIsAuthenticated, setUser]);

  return children;
};

export default AuthProvider;
