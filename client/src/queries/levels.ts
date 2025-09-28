import { useQuery } from "@tanstack/react-query";
import { Level } from "../types/Level";

/** 
 * Fetch phonics levels from the API 
 */
export const fetchLevels = async (): Promise<Level[]> => {
  const response = await fetch("/phonics_levels");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

/** 
 * Custom hook to fetch phonics levels
 */
export const useLevels = () => useQuery<Level[]>({
  queryKey: ["LEVELS"],
  queryFn: fetchLevels,
});