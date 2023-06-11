import useSWR from "swr";
import useFetcher from "./useFetcher";

const useCourse = (id: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading, mutate } = useSWR(
    `http://127.0.0.1:8000/api/courses/${id}`,
    fetcher
  );

  return {
    course: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useCourse;
