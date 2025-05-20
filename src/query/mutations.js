import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORGANIZATIONS, USER } from "./keys";
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiAddOrganization,
  apiEditOrganization,
  apiEditUser,
} from "../api/api";
import { toast } from "react-toastify";

// Auth mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiLogin,
    onSuccess: async (data) => {
      queryClient.setQueryData([USER], data);
    },
    onError: (err) => {
      const msg = "Ошибка входа";
      toast.error(msg);
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiRegister,
    onSuccess: async (data) => {
      toast.success("Вы успешно зарегистрированы");
      queryClient.setQueryData([USER], data);
    },
    onError: (err) => {
      const msg = "Ошибка регистрации";
      toast.error(msg);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await apiLogout();
      queryClient.setQueryData([USER], null);
    },
    onError: (err) => {
      const msg = "Ошибка выхода";
      toast.error(msg);
    },
  });
};

export const useAddOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddOrganization,
    onSuccess: () => {
      toast.success("Организация добавлена");
      queryClient.invalidateQueries([ORGANIZATIONS]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления организации";
      toast.error(msg);
    },
  });
};

export const useEditOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiEditOrganization(id, data),
    onSuccess: () => {
      toast.success("Организация обновлена");
      queryClient.invalidateQueries([ORGANIZATIONS]);
    },
    onError: (err) => {
      const msg = "Ошибка обновления организации";
      toast.error(msg);
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiEditUser(id, data),
    onSuccess: () => {
      toast.success("Пользователь обновлен");
      queryClient.invalidateQueries([USER]);
    },
    onError: (err) => {
      const msg = "Ошибка обновления пользователя";
      toast.error(msg);
    },
  });
};
