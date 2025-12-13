import { privilegeService } from "../../services/privilegeService";

export function usePrivileges({ setLoading, setError, setInfo, setReload }) {
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

  const getPrivilegeList = ({ pageIndex, pageLength, search = "" }) =>
    wrap(async () => {
      const response = await privilegeService.getPrivilegeList(gatewayUrl, {
        pageIndex,
        pageLength,
        search,
      });
      return response.data.payload;
    });

  const getPrivilegeById = (id) =>
    wrap(async () => {
      const response = await privilegeService.getPrivilegeById(gatewayUrl, id);
      return response.data.payload;
    });

  const addPrivilege = ({ name, description }) =>
    wrap(async () => {
      const response = await privilegeService.addPrivilege(gatewayUrl, { name, description });
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const updatePrivilege = ({ id, name, description }) =>
    wrap(async () => {
      const response = await privilegeService.updatePrivilege(gatewayUrl, id, { name, description });
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  const deletePrivilege = (id) =>
    wrap(async () => {
      const response = await privilegeService.deletePrivilege(gatewayUrl, id);
      setInfo(response.data.payload);
      setReload?.((prev) => prev + 1);
      return response.data.payload;
    });

  return {
    getPrivilegeList,
    getPrivilegeById,
    addPrivilege,
    updatePrivilege,
    deletePrivilege,
  };
}
