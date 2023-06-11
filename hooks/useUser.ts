import axios from "axios";
import useSWR from "swr";
import useFetcher from "./useFetcher";

const useUser = () => {
  const fetcher = useFetcher();

  const { data, error, isLoading, mutate } = useSWR(
    `http://127.0.0.1:8000/api/profile`,
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
