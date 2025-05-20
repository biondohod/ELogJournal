import { useQuery } from "@tanstack/react-query";
import { ORGANIZATION, ORGANIZATIONS, USER, USERS } from "./keys";
import {
  apiGetUser,
  apiGetUserList,
  apiGetUserById,
  apiGetOrganizations,
  apiGetOrganizationById,
} from "../api/api";

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

export const useUserList = () => {
  return useQuery({
    queryKey: [USERS],
    queryFn: apiGetUserList,
    retry: 3,
  });
};

export const useUserById = (id) => {
  return useQuery({
    queryKey: [USER, id],
    queryFn: () => apiGetUserById(id),
    enabled: !!id,
    retry: 2,
  });
};

export const useOrganizations = () => {
  return useQuery({
    queryKey: [ORGANIZATIONS],
    queryFn: apiGetOrganizations,
    retry: 2,
  });
};

export const useOrganizationById = (id) => {
  return useQuery({
    queryKey: [ORGANIZATION, id],
    queryFn: () => apiGetOrganizationById(id),
    enabled: !!id,
    retry: 2,
  });
};
