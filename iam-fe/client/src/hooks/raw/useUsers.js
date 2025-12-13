import { userService } from "../../services/userService";

export function useUsers({ setLoading, setError, setInfo, setReload }) {
  const gatewayUrl = import.meta.env.VITE_GATEWAY_URL;

  const wrap = async (fn) => {
    setLoading(true);
    setError(null);
    setInfo(null);

    try {
      return await fn();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getSortedUserList = (params) =>
    wrap(async () => {
      const response = await userService.getSortedUserList(gatewayUrl, {
        sortBy: params.sortBy || "SORT_BY_IDENTITY",
        PageIndex: params.pageIndex || 1,
        PageLength: params.pageLength || 10,
        Search: params.search || undefined,
        Gender: params.gender || undefined,
        IsActive: params.isActive,
        DateOfBirthFrom: params.dateOfBirthFrom || undefined,
        DateOfBirthTo: params.dateOfBirthTo || undefined,
      });
      return response.data.payload;
    });

  const getUserById = (id) =>
    wrap(async () => {
      const response = await userService.getUserById(gatewayUrl, id);
      return response.data.payload;
    });

  const addUser = (user) =>
    wrap(async () => {
      const response = await userService.addUser(gatewayUrl, user);
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const updateUser = (user) =>
    wrap(async () => {
      const response = await userService.updateUser(gatewayUrl, user.id, user);
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const updateUserRole = ({ id, items }) =>
    wrap(async () => {
      const response = await userService.updateUserRole(gatewayUrl, id, { items });
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const updateUserPrivilege = ({ id, items }) =>
    wrap(async () => {
      const response = await userService.updateUserPrivilege(gatewayUrl, id, { items });
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const changePassword = ({ oldPassword, newPassword, newConfirmedPassword }) =>
    wrap(async () => {
      const response = await userService.changePassword(gatewayUrl, { oldPassword, newPassword, newConfirmedPassword });
      setInfo(response.data.payload);
      return response.data.payload;
    });

  const deleteUser = (id) =>
    wrap(async () => {
      const response = await userService.deleteUser(gatewayUrl, id);
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  return {
    getSortedUserList,
    getUserById,
    addUser,
    updateUser,
    updateUserRole,
    updateUserPrivilege,
    changePassword,
    deleteUser,
  };
}
