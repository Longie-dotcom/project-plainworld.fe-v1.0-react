import { roleApi } from "../api/roleApi";

export const roleService = {
  async getRoleList(gatewayUrl, filters) {
    const token = localStorage.getItem("accessToken");
    return roleApi.getRoles(gatewayUrl, filters, token);
  },

  async getRoleDetail(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return roleApi.getRoleById(gatewayUrl, id, token);
  },

  async addRole(gatewayUrl, data) {
    const token = localStorage.getItem("accessToken");
    return roleApi.addRole(gatewayUrl, data, token);
  },

  async updateRole(gatewayUrl, id, data) {
    const token = localStorage.getItem("accessToken");
    return roleApi.updateRole(gatewayUrl, id, data, token);
  },

  async updateRolePrivilege(gatewayUrl, id, data) {
    const token = localStorage.getItem("accessToken");
    return roleApi.updateRolePrivilege(gatewayUrl, id, data, token);
  },

  async deleteRole(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return roleApi.deleteRole(gatewayUrl, id, token);
  }
};
