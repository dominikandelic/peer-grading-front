import useSWR from "swr";
import useFetcher from "./useFetcher";
import { useAuthStore } from "../stores/authStore";

const useOwnSubmission = (taskId: number) => {
  const fetcher = useFetcher();
  const username = useAuthStore((store) => store.username);

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${taskId}/${username}/submission`,
    fetcher
  );

  return {
    submission: data,
    isLoading,
    isError: error,
  };
};

export default useOwnSubmission;
