import { userApi } from "../api/userApi";

export const userService = {
  async getSortedUserList(gatewayUrl, filters) {
    const token = localStorage.getItem("accessToken");
    return userApi.getUsers(gatewayUrl, filters, token);
  },

  async addUser(gatewayUrl, data) {
    const token = localStorage.getItem("accessToken");
    return userApi.addUser(gatewayUrl, data, token);
  },

  async updateUser(gatewayUrl, id, data) {
    const token = localStorage.getItem("accessToken");
    return userApi.updateUser(gatewayUrl, id, data, token);
  },

  async updateUserRole(gatewayUrl, id, data) {
    const token = localStorage.getItem("accessToken");
    return userApi.updateUserRole(gatewayUrl, id, data, token);
  },

  async updateUserPrivilege(gatewayUrl, id, data) {
    const token = localStorage.getItem("accessToken");
    return userApi.updateUserPrivilege(gatewayUrl, id, data, token);
  },

  async changePassword(gatewayUrl, data) {
    const token = localStorage.getItem("accessToken");
    return userApi.changePassword(gatewayUrl, data, token);
  },

  async deleteUser(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return userApi.deleteUser(gatewayUrl, id, token);
  },

  async getUserById(gatewayUrl, id) {
    const token = localStorage.getItem("accessToken");
    return userApi.getUserById(gatewayUrl, id, token);
  }
};
