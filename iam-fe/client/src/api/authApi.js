import api from "../perceptors/refreshTokenInstance";

export const authApi = {
  login: (gatewayUrl, body) =>
    api.post(`${gatewayUrl}/iam/auth/login`, body),

  logout: (gatewayUrl, email) =>
    api.get(`${gatewayUrl}/iam/auth/logout/${email}`),

  forgotPassword: (gatewayUrl, body) =>
    api.post(`${gatewayUrl}/iam/auth/forgot-password`, body),

  resetPassword: (gatewayUrl, body) =>
    api.post(`${gatewayUrl}/iam/auth/reset-password`, body)
};
