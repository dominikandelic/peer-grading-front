import useSWR from "swr";
import useFetcher from "./useFetcher";

const useStudents = () => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR(
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
