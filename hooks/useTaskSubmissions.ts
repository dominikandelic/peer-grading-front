import useSWR from "swr";
import useFetcher from "./useFetcher";

const useTaskSubmissions = (taskId: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/task-submissions/${taskId}`,
    fetcher
  );

  return {
    submissions: data,
    isLoading,
    isError: error,
  };
};

export default useTaskSubmissions;
