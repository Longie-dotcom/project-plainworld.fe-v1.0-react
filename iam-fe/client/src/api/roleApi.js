import api from "../perceptors/refreshTokenInstance";

export const roleApi = {
  getRoles: (gatewayUrl, params, token) =>
    api.get(`${gatewayUrl}/iam/role`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    }),

  getRoleById: (gatewayUrl, id, token) =>
    api.get(`${gatewayUrl}/iam/role/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  addRole: (gatewayUrl, body, token) =>
    api.post(`${gatewayUrl}/iam/role`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateRole: (gatewayUrl, id, body, token) =>
    api.put(`${gatewayUrl}/iam/role/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateRolePrivilege: (gatewayUrl, id, body, token) =>
    api.put(`${gatewayUrl}/iam/role/privilege/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  deleteRole: (gatewayUrl, id, token) =>
    api.delete(`${gatewayUrl}/iam/role/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
};
