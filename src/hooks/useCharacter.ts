import { useQuery } from "@tanstack/react-query";
import { fetchCharacters } from "../api/client";

export const useGetAllCharacters = (page: number, name?: string) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["characters", page, name],
    queryFn: () => fetchCharacters(page, name),
    gcTime: 0, // Disable garbage collection time
    staleTime: 0, // Always consider data stale
  });
  return {
    data,
    isFetching,
    refetch,
  };
};
