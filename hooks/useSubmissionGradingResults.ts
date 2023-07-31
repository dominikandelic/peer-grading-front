import useSWR from "swr";
import useFetcher from "./useFetcher";
import { SubmissionGradeResponse } from "../api/generated";

const useSubmissionGradingResults = (submissionId: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR<SubmissionGradeResponse[]>(
    `http://127.0.0.1:8000/api/grading/submissions/${submissionId}/results`,
    fetcher
  );

  return {
    submissionGradings: data,
    isLoading,
    isError: error,
  };
};

export default useSubmissionGradingResults;
