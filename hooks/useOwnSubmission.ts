import useSWR from "swr";
import useFetcher from "./useFetcher";
import { useAuthStore } from "../stores/authStore";
import { SubmissionResponse } from "../api/generated";

const useOwnSubmission = (taskId: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading, mutate } = useSWR<SubmissionResponse>(
    `http://127.0.0.1:8000/api/tasks/${taskId}/own-submission`,
    fetcher
  );

  return {
    submission: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useOwnSubmission;
