import { useQuery } from "@tanstack/react-query";
import {
  FACILITIES,
  FACILITY,
  FILE,
  ORGANIZATION,
  ORGANIZATIONS,
  PERMISSIONS_FACILITY,
  PERMISSIONS_GLOBAL,
  USER,
  USERS,
} from "./keys";
import {
  apiGetUser,
  apiGetUserList,
  apiGetUserById,
  apiGetOrganizations,
  apiGetOrganizationById,
  apiGetFacilities,
  apiGetFacilityById,
  apiGetFileById,
  apiGetUsersByIds,
  apiGetNotifications,
  apiGetGlobalPermissions,
  apiGetFacilityPermissions,
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

export const useNotifications = () => {
  const currentUserId = localStorage.getItem("currentUserId");
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: ["notifications", currentUserId],
    queryFn: apiGetNotifications,
    enabled: !!currentUserId && !!token,
    retry: false,
    refetchInterval: 120000,
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

export const useUserByIds = (ids) => {
  return useQuery({
    queryKey: [USERS, ids],
    queryFn: () => apiGetUsersByIds(ids),
    enabled: !!ids && ids.length > 0,
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

export const useFacilities = () => {
  return useQuery({
    queryKey: [FACILITIES],
    queryFn: apiGetFacilities,
    retry: 2,
  });
};

export const useFacilityById = (id) => {
  return useQuery({
    queryKey: [FACILITY, id],
    queryFn: () => apiGetFacilityById(id),
    enabled: !!id,
    retry: 2,
  });
};

export const useFileById = (id) => {
  return useQuery({
    queryKey: [FILE, id],
    queryFn: () => apiGetFileById(id),
    enabled: !!id,
    retry: 2,
  });
};

export const usePermissionsGlobal = () => {
  const currentUserId = localStorage.getItem("currentUserId");
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: [PERMISSIONS_GLOBAL, currentUserId],
    queryFn: apiGetGlobalPermissions,
    enabled: !!currentUserId && !!token,
    retry: 2,
  });
};

export const usePermissionsFacility = (id) => {
  const currentUserId = localStorage.getItem("currentUserId");
  const token = localStorage.getItem("token");

  return useQuery({
    queryKey: [PERMISSIONS_FACILITY, currentUserId],
    queryFn: () => apiGetFacilityPermissions(id),
    enabled: !!currentUserId && !!token,
    retry: 2,
  });
};
