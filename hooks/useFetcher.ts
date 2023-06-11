import useAuthorizedAxios from "./useAuthorizedAxios";

const useFetcher = () => {
  const { authorizedAxios } = useAuthorizedAxios();
  const fetcher = (url: string) =>
    authorizedAxios.get(url).then((res) => res.data);
  return { fetcher };
};

export default useFetcher;
