import useSWR from "swr";
import useFetcher from "./useFetcher";

const useStudentSubmissionChecker = (taskId: number) => {
  const fetcher = useFetcher();
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${taskId}/student/has-submitted`,
    fetcher
  );

  return {
    hasSubmitted: data,
    isLoading,
    isError: error,
  };
};

export default useStudentSubmissionChecker;
