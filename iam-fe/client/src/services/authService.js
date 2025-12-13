import { authApi } from "../api/authApi";
import { tokenHelper } from "../helpers/tokenHelper";

export const authService = {
  async login(gatewayUrl, body) {
    const response = await authApi.login(gatewayUrl, body);
    const { accessToken, refreshToken } = response.data.payload;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return { accessToken, refreshToken };
  },

  async logout(gatewayUrl) {
    const email = tokenHelper.getEmail();
    const token = tokenHelper.getToken();

    if (!token) throw new Error("No access token found");
    if (!email) throw new Error("Email not found in token");

    await authApi.logout(gatewayUrl, email, token);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  async forgotPassword(gatewayUrl, body) {
    return await authApi.forgotPassword(gatewayUrl, body);
  },

  async resetPassword(gatewayUrl, body) {
    return await authApi.resetPassword(gatewayUrl, body);
  },

  getCurrentUser() {
    return {
      id: tokenHelper.getUserId(),
      email: tokenHelper.getEmail(),
      fullName: tokenHelper.getFullName(),
      role: tokenHelper.getRole(),
      privileges: tokenHelper.getPrivileges(),
      isExpired: tokenHelper.isTokenExpired()
    };
  }
};
