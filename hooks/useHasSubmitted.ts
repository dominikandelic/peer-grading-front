import useSWR from "swr";
import useFetcher from "./useFetcher";
import useStore from "./useStore";
import { useAuthStore } from "../stores/authStore";

const useStudentSubmissionChecker = (taskId: number) => {
  const fetcher = useFetcher();
  const user = useAuthStore((store) => store.user);
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${taskId}/${user?.username}/has-submitted`,
    fetcher
  );

  return {
    hasSubmitted: data,
    isLoading,
    isError: error,
  };
};

export default useStudentSubmissionChecker;
