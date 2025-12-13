// src/helpers/tokenHelper.js
import { jwtDecode } from "jwt-decode";

export const tokenHelper = {
  getToken: () => localStorage.getItem("accessToken"),

  decodeToken: () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Invalid JWT token:", err);
      return null;
    }
  },

  getUserId: () => {
    const decoded = tokenHelper.decodeToken();
    return decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] || null;
  },

  getEmail: () => {
    const decoded = tokenHelper.decodeToken();
    return decoded?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"] || null;
  },

  getFullName: () => {
    const decoded = tokenHelper.decodeToken();
    return decoded?.FullName || null;
  },

  getRole: () => {
    const decoded = tokenHelper.decodeToken();
    return decoded?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
  },

  getPrivileges: () => {
    const decoded = tokenHelper.decodeToken();
    const privileges = decoded?.Privileges || "";
    return privileges.split(",").map(p => p.trim()).filter(p => p);
  },

  isTokenExpired: () => {
    const decoded = tokenHelper.decodeToken();
    if (!decoded?.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }
};
