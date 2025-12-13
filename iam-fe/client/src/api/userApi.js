import api from "../perceptors/refreshTokenInstance";

export const userApi = {
  getUsers: (gatewayUrl, params, token) =>
    api.get(`${gatewayUrl}/iam/user`, {
      params,
      headers: { Authorization: `Bearer ${token}` }
    }),

  getUserById: (gatewayUrl, id, token) =>
    api.get(`${gatewayUrl}/iam/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  addUser: (gatewayUrl, body, token) =>
    api.post(`${gatewayUrl}/iam/user`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateUser: (gatewayUrl, id, body, token) => 
    api.put(`${gatewayUrl}/iam/user/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateUserRole: (gatewayUrl, id, body, token) => 
    api.put(`${gatewayUrl}/iam/user/role/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  updateUserPrivilege: (gatewayUrl, id, body, token) => 
    api.put(`${gatewayUrl}/iam/user/privilege/${id}`, body, {
      headers: { Authorization: `Bearer ${token}` }
    }),

  changePassword: (gatewayUrl, body, token) =>
    api.put(`${gatewayUrl}/iam/user/change-password`, body, {
      headers: { Authorization: `Bearer ${token}` },
    }),
    
  deleteUser: (gatewayUrl, id, body, token) =>
    api.delete(`${gatewayUrl}/iam/user/${id}`, {
      data: body,
      headers: { Authorization: `Bearer ${token}` }
    }),
};
