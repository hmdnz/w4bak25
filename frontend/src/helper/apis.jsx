import { useLocation } from "react-router-dom";

export const api = "https://api.wenyfour.com/api";
export function useQuery() {
  return new URLSearchParams(useLocation().search);
}
