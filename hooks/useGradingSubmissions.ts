import useSWR from "swr";
import useFetcher from "./useFetcher";

const useGradingSubmissions = (taskId: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/grading/${taskId}`,
    fetcher
  );

  return {
    submissions: data,
    isLoading,
    isError: error,
  };
};

export default useGradingSubmissions;
