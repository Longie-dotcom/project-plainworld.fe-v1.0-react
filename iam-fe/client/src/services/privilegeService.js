import { privilegeApi } from "../api/privilegeApi";

export const privilegeService = {
  async getPrivilegeList(gatewayUrl, filters) {
    const token = localStorage.getItem("accessToken");
    return privilegeApi.getPrivilegeList(gatewayUrl, filters, token);
  },

  async getPrivilegeById(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return privilegeApi.getPrivilegeById(gatewayUrl, id, token);
  },

  async addPrivilege(gatewayUrl, { name, description }) {
    const token = localStorage.getItem("accessToken");
    return privilegeApi.addPrivilege(gatewayUrl, { name, description }, token);
  },

  async updatePrivilege(gatewayUrl, id, { name, description }) {
    const token = localStorage.getItem("accessToken");
    return privilegeApi.updatePrivilege(gatewayUrl, id, { name, description }, token);
  },

  async deletePrivilege(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return privilegeApi.deletePrivilege(gatewayUrl, id, token);
  },
};
