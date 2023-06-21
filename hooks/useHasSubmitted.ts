import useSWR from "swr";
import useFetcher from "./useFetcher";
import useStore from "./useStore";
import { useAuthStore } from "../stores/authStore";

const useStudentSubmissionChecker = (taskId: number) => {
  const fetcher = useFetcher();
  const username = useAuthStore((store) => store.username);
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${taskId}/${username}/has-submitted`,
    fetcher
  );

  return {
    hasSubmitted: data,
    isLoading,
    isError: error,
  };
};

export default useStudentSubmissionChecker;
