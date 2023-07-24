import useSWR from "swr";
import useFetcher from "./useFetcher";
import { UserResponse } from "../api/generated";

const useUser = (userId?: number) => {
  const fetcher = useFetcher();

  const url = userId
    ? `http://127.0.0.1:8000/api/users/${userId}`
    : `http://127.0.0.1:8000/api/profile`;

  const { data, error, isLoading, mutate } = useSWR<UserResponse>(url, fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
};

export default useUser;
