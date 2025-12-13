import { roleService } from "../../services/roleService";

export function useRoles({ setLoading, setError, setInfo, setReload }) {
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

  const getRoleList = ({ pageIndex, pageLength, search = "" }) =>
    wrap(async () => {
      const res = await roleService.getRoleList(gatewayUrl, { pageIndex, pageLength, search });
      return res.data.payload;
    });

  const getRoleDetail = (id) =>
    wrap(async () => {
      const res = await roleService.getRoleDetail(gatewayUrl, id);
      return res.data.payload;
    });

  const addRole = ({ code, name, description }) =>
    wrap(async () => {
      const res = await roleService.addRole(gatewayUrl, { code, name, description });
      setInfo(res.data.payload);
      setReload?.((prev) => prev + 1);
      return res.data.payload;
    });

  const updateRole = ({ id, name, description }) =>
    wrap(async () => {
      const res = await roleService.updateRole(gatewayUrl, id, { name, description });
      setInfo(res.data.payload);
      setReload?.((prev) => prev + 1);
      return res.data.payload;
    });

  const updateRolePrivilege = ({ id, privilegeID }) =>
    wrap(async () => {
      const res = await roleService.updateRolePrivilege(gatewayUrl, id, { privilegeID });
      setInfo(res.data.payload);
      setReload?.((prev) => prev + 1);
      return res.data.payload;
    });

  const deleteRole = (id) =>
    wrap(async () => {
      const res = await roleService.deleteRole(gatewayUrl, id);
      setInfo(res.data.payload);
      setReload?.((prev) => prev + 1);
      return res.data.payload;
    });

  return {
    getRoleList,
    getRoleDetail,
    addRole,
    updateRole,
    updateRolePrivilege,
    deleteRole,
  };
}
