import useSWR from "swr";
import useFetcher from "./useFetcher";

const useCourses = () => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/courses`,
    fetcher
  );

  return {
    courses: data,
    isLoading,
    isError: error,
  };
};

export default useCourses;
