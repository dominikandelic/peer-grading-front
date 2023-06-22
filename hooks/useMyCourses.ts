import useSWR from "swr";
import useFetcher from "./useFetcher";
import { useAuthStore } from "../stores/authStore";

const useMyCourses = () => {
  const fetcher = useFetcher();
  const user = useAuthStore((store) => store.user);
  const parentResourceUri = user?.is_student ? "students" : "teachers";
  const { data, error, isLoading } = useSWR(
    `http://127.0.0.1:8000/api/${parentResourceUri}/${user?.id}/courses`,
    fetcher
  );

  return {
    courses: data,
    isLoading,
    isError: error,
  };
};

export default useMyCourses;
