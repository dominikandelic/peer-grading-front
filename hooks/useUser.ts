import axios from "axios";
import useSWR from "swr";
import useFetcher from "./useFetcher";

const useUser = (userId?: number) => {
  const fetcher = useFetcher();

  const url = userId
    ? `http://127.0.0.1:8000/api/users/${userId}`
    : `http://127.0.0.1:8000/api/profile`;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
