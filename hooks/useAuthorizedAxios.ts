import { toast } from "react-toastify";
import { useAuthStore } from "../stores/authStore";
import axios, { AxiosError } from "axios";

const useAuthorizedAxios = () => {
  const { accessToken, refreshToken, set } = useAuthStore();
  const refreshTokenEndpoint = "http://127.0.0.1:8000/api/token/refresh";
  const localAxios = axios;
  // Function to refresh the access token using the refresh token
  async function refreshAccessToken() {
    try {
      const response = await axios.post(refreshTokenEndpoint, {
        refresh: refreshToken,
      });
      set({
        accessToken: response.data.access,
        refreshToken: response.data.refresh,
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  localAxios.interceptors.request.clear();

  localAxios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  localAxios.interceptors.response.clear();

  // Axios interceptor to handle expired tokens
  localAxios.interceptors.response.use(
    (response: any) => response,
    (error: { config: any; response: { status: number } }) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        return refreshAccessToken().then(() => {
          set({
            accessToken: "",
            refreshToken: "",
            username: "",
          });
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        });
      }

      if (error.response.status === 400) {
        if (error instanceof AxiosError)
          toast.error(error.response.data.detail);
      }

      return Promise.reject(error);
    }
  );
  return { authorizedAxios: localAxios };
};

export default useAuthorizedAxios;
