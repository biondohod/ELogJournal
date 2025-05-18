import { useQuery } from "@tanstack/react-query";
import { USER } from "./keys";
import { apiGetUser } from "../api/api";

export const useUser = () => {
  const currentUserId = localStorage.getItem("currentUserId");
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: [USER],
    queryFn: apiGetUser,
    enabled: !!currentUserId && !!token,
    retry: false,
  });
};
