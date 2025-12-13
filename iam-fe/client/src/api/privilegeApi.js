import api from "../perceptors/refreshTokenInstance";

export const privilegeApi = {
  getPrivilegeList: (gatewayUrl, params, token) =>
    api.get(`${gatewayUrl}/iam/privilege`, {
      params,
      headers: { Authorization: `Bearer ${token}` },
    }),

  getPrivilegeById: (gatewayUrl, id, token) =>
    api.get(`${gatewayUrl}/iam/privilege/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  addPrivilege: (gatewayUrl, body, token) =>
    api.post(`${gatewayUrl}/iam/privilege`, body, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updatePrivilege: (gatewayUrl, id, body, token) =>
    api.put(`${gatewayUrl}/iam/privilege/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deletePrivilege: (gatewayUrl, id, token) =>
    api.delete(`${gatewayUrl}/iam/privilege/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
