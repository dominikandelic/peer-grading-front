import useSWR from "swr";
import useFetcher from "./useFetcher";

const useTask = (id: number) => {
  const fetcher = useFetcher();

  const { data, error, isLoading, mutate } = useSWR(
    `http://127.0.0.1:8000/api/tasks/${id}`,
    fetcher
  );

  return {
    task: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useTask;
