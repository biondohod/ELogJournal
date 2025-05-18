import { useMutation, useQueryClient } from "@tanstack/react-query";
import { USER } from "./keys";
import { apiLogin, apiLogout, apiRegister } from "../api/api";
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
      const msg =
        err?.response?.data?.message || err?.message || "Ошибка входа";
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
      const msg =
        err?.response?.data?.message || err?.message || "Ошибка регистрации";
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
      const msg =
        err?.response?.data?.message || err?.message || "Ошибка выхода";
      toast.error(msg);
    },
  });
};
