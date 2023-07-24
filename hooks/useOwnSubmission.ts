import useSWR from "swr";
import useFetcher from "./useFetcher";
import { useAuthStore } from "../stores/authStore";

const useOwnSubmission = (taskId: number) => {
  const fetcher = useFetcher();
  const user = useAuthStore((store) => store.user);

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${taskId}/own-submission`,
    fetcher
  );

  return {
    submission: data,
    isLoading,
    isError: error,
  };
};

export default useOwnSubmission;
