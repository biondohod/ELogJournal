import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FACILITIES, FACILITY, ORGANIZATIONS, USER } from "./keys";
import {
  apiLogin,
  apiLogout,
  apiRegister,
  apiAddOrganization,
  apiEditOrganization,
  apiEditUser,
  apiAddFacility,
  apiEditFacility,
  apiUploadFile,
  apiAddRegistrationSheet,
  apiAddWorkIssue,
  apiAnswerWorkIssue,
  apiAddRecordSheet,
  apiEditRecordSheet,
  apiReadNotification,
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

export const useAddFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddFacility,
    onSuccess: () => {
      toast.success("Объект добавлен");
      queryClient.invalidateQueries([FACILITIES]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления объекта";
      toast.error(msg);
    },
  });
};

export const useEditFacility = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiEditFacility(id, data),
    onSuccess: (data, variables) => {
      toast.success("Объект обновлен");
      queryClient.invalidateQueries([FACILITIES]);
      queryClient.invalidateQueries([FACILITY, variables?.id]);
    },
    onError: (err) => {
      const msg = "Ошибка обновления объекта";
      toast.error(msg);
    },
  });
};

export const useUploadFile = () => {
  return useMutation({
    mutationFn: apiUploadFile,
    onError: () => {
      toast.error("Ошибка загрузки файла");
    },
  });
};

export const useAddRegistrationSheet = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddRegistrationSheet,
    onSuccess: () => {
      toast.success("Регистрационный лист добавлен");
      queryClient.invalidateQueries([FACILITY, id]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления регистрационного листа";
      toast.error(msg);
    },
  });
};

export const useAddWorkIssue = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddWorkIssue,
    onSuccess: () => {
      toast.success("Рабочий вопрос задан");
      queryClient.invalidateQueries([FACILITY, id]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления рабочего вопроса";
      toast.error(msg);
    },
  });
};

export const useAnswerWorkIssue = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiAnswerWorkIssue(id, data),
    onSuccess: () => {
      toast.success("Ответ на рабочий вопрос добавлен");
      queryClient.invalidateQueries([FACILITY, id]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления ответа на рабочий вопрос";
      toast.error(msg);
    },
  });
};

export const useAddRecordSheet = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiAddRecordSheet,
    onSuccess: () => {
      toast.success("Учетный лист добавлен");
      queryClient.invalidateQueries([FACILITY, id]);
    },
    onError: (err) => {
      const msg = "Ошибка добавления учетного листа";
      toast.error(msg);
    },
  });
};

export const useEditRecordSheet = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => apiEditRecordSheet(id, data),
    onSuccess: () => {
      toast.success("Учетный лист обновлен");
      queryClient.invalidateQueries([FACILITY, id]);
    },
    onError: (err) => {
      const msg = "Ошибка обновления учетного листа";
      toast.error(msg);
    },
  });
};

export const useReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => apiReadNotification(id),
    onSuccess: (id) => {
      toast.success("Уведомление прочитано");
      queryClient.invalidateQueries(["notifications"]);
    },
    onError: (err) => {
      const msg = "Ошибка при отметке уведомления как прочитанного";
      toast.error(msg);
    },
  });
};
