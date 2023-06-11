import { useRouter } from "next/router";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const useProtectedRoute = () => {
  const { accessToken, set } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      set({
        accessToken: "",
        refreshToken: "",
        username: "",
      });
      router.push("/login");
    }
  }, [accessToken]);
};

export default useProtectedRoute;
