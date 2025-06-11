import axios from "axios";

const URL = "/api";

const axiosJwt = axios.create();

const getToken = () => localStorage.getItem("token");
const getRefreshToken = () => localStorage.getItem("refreshToken");
const getTokenExpiry = () => localStorage.getItem("tokenExpiry");
const getCurrentUserId = () => localStorage.getItem("currentUserId");

const setTokens = ({ token, refreshToken, tokenExpiry, id }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("tokenExpiry", tokenExpiry);
  localStorage.setItem("currentUserId", id);
};

const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("currentUserId");
};

axiosJwt.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosJwt.interceptors.request.use(async (config) => {
  const expiry = getTokenExpiry();
  if (!expiry) return config;
  const expiryDate = new Date(expiry);
  if (Date.now() > expiryDate) {
    try {
      await apiRefreshToken();
    } catch (e) {
      console.log("Token refresh failed", e);
    }
  }
  return config;
});

export const apiRefreshToken = async () => {
  const refreshToken = getRefreshToken();
  const token = getToken();
  const res = await axios.post(
    `${URL}/Auth/refresh`,
    { token, refreshToken },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  setTokens(res.data);
  return res.data;
};

export const apiLogin = async (data) => {
  const res = await axios.post(`${URL}/Auth/login`, data);
  setTokens(res.data);
  return res.data;
};

export const apiRegister = async (data) => {
  const res = await axios.post(`${URL}/Auth/register`, data);
  setTokens(res.data);
  return res.data;
};

export const apiLogout = async () => {
  const refreshToken = getRefreshToken();
  const res = await axiosJwt.post(`${URL}/Auth/revoke`, { refreshToken });
  clearTokens();
  return res.data;
};

export const apiGetUser = async () => {
  const res = await axiosJwt.get(`${URL}/Users/${getCurrentUserId()}`);
  return res.data;
};

export const apiGetUserList = async () => {
  const res = await axiosJwt.get(`${URL}/Users?GetAll=true`);
  return res.data;
};

export const apiGetUserById = async (id) => {
  const res = await axiosJwt.get(`${URL}/Users/${id}`);
  return res.data;
};

export const apiGetUsersByIds = async (ids) => {
  const res = await axiosJwt.get(`${URL}/Users?Ids=${ids.join("&Ids=")}`);
  return res.data;
};

export const apiGetNotifications = async () => {
  const res = await axiosJwt.get(
    `${URL}/RecordSheetItemNotifications?GetAll=true&UserId=${getCurrentUserId()}&IsRead=false`
  );
  return res.data;
};

export const apiReadNotification = async (id) => {
  const res = await axiosJwt.patch(
    `${URL}/RecordSheetItemNotifications/${id}`,
    {
      isRead: true,
      id,
    }
  );
  return res.data;
};

export const apiEditUser = async (id, data) => {
  const res = await axiosJwt.patch(`${URL}/Users/${id}`, data);
  return res.data;
};

export const apiAddOrganization = async (data) => {
  const res = await axiosJwt.post(`${URL}/Organizations`, data);
  return res.data;
};

export const apiGetOrganizations = async () => {
  const res = await axiosJwt.get(`${URL}/Organizations?GetAll=true`);
  return res.data;
};

export const apiGetOrganizationById = async (id) => {
  const res = await axiosJwt.get(`${URL}/Organizations/${id}`);
  return res.data;
};

export const apiEditOrganization = async (id, data) => {
  const res = await axiosJwt.patch(`${URL}/Organizations/${id}`, data);
  return res.data;
};

export const apiAddFacility = async (data) => {
  const res = await axiosJwt.post(`${URL}/ConstructionSites`, data);
  return res.data;
};

export const apiGetFacilities = async () => {
  const res = await axiosJwt.get(
    `${URL}/ConstructionSites/accessible?GetAll=true}`
  );
  return res.data;
};

export const apiGetFacilityById = async (id) => {
  const res = await axiosJwt.get(`${URL}/ConstructionSites/${id}`);
  return res.data;
};

export const apiEditFacility = async (id, data) => {
  const res = await axiosJwt.patch(`${URL}/ConstructionSites/${id}`, data);
  return res.data;
};

export const apiUploadFile = async (data) => {
  const formData = new FormData();
  formData.append("file", data);
  const res = await axiosJwt.post(`${URL}/Files/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const apiGetFileById = async (id) => {
  const res = await axiosJwt.get(`${URL}/Files/${id}`);
  return res.data;
};

export const apiAddRegistrationSheet = async (data) => {
  const res = await axiosJwt.post(`${URL}/RegistrationSheetItems`, data);
  return res.data;
};

export const apiAddWorkIssue = async (data) => {
  const res = await axiosJwt.post(`${URL}/WorkIssueItems`, data);
  return res.data;
};

export const apiAnswerWorkIssue = async (id, data) => {
  const res = await axiosJwt.patch(`${URL}/WorkIssueItems/${id}`, data);
  return res.data;
};

export const apiAddRecordSheet = async (data) => {
  const res = await axiosJwt.post(`${URL}/RecordSheetItems`, data);
  return res.data;
};

export const apiEditRecordSheet = async (id, data) => {
  const res = await axiosJwt.patch(`${URL}/RecordSheetItems/${id}`, data);
  return res.data;
};

export const apiGetGlobalPermissions = async () => {
  const res = await axiosJwt.get(`${URL}/Permissions/global`);
  return res.data;
};

export const apiGetFacilityPermissions = async (facilityId) => {
  const res = await axiosJwt.get(
    `${URL}/Permissions/constructionSite/${facilityId}`
  );
  return res.data;
};
