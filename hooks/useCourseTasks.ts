import useSWR from "swr";
import useFetcher from "./useFetcher";

const useCourseTasks = (id: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/courses/${id}/tasks/`,
    fetcher
  );

  return {
    tasks: data,
    isLoading,
    isError: error,
  };
};

export default useCourseTasks;
