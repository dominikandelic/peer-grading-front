import { useRouter } from "next/router";
import { useAuthStore } from "../stores/authStore";
import { useEffect } from "react";

const useProtectedRoute = () => {
  const { accessToken } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  }, [accessToken]);
};
