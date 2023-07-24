import useSWR from "swr";
import useFetcher from "./useFetcher";
import { UserResponse } from "../api/generated";

const useStudents = () => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR<UserResponse>(
    `http://127.0.0.1:8000/api/students`,
    fetcher
  );

  return {
    students: data,
    isLoading,
    isError: error,
  };
};

export default useStudents;
