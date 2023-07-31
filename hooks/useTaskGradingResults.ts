import useSWR from "swr";
import useFetcher from "./useFetcher";
import { GradingResultResponse } from "../api/generated";

const useTaskGradingResults = (taskId: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR<GradingResultResponse[]>(
    `http://127.0.0.1:8000/api/grading/${taskId}/results`,
    fetcher
  );

  return {
    gradingResults: data,
    isLoading,
    isError: error,
  };
};

export default useTaskGradingResults;
