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
  const res = await axios.post(
    `${URL}/Auth/refresh`,
    { refreshToken },
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
