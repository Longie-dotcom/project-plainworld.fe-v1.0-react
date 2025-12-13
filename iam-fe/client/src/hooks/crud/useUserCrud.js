import { useState, useEffect } from "react";
import { usePrivileges } from "../raw/usePrivileges";
import { useRoles } from "../raw/useRoles";
import { useUsers } from "../raw/useUsers";
import {
  userMetadata,
  userColumns,
  userBuildQueryParams,
  userDetailFields,
  userIdField,
  columnTemplate,
  userCreateFields,
  userUpdateFields,
  userRoleToggleConfig,
  userPrivilegeToggleConfig
} from "../../configs/userConfigs";


export function useUserCrud({ setLoading, setError, setInfo, setReload }) {
  const [createConfig, setCreateConfig] = useState({ fields: [] });
  const [updateConfig, setUpdateConfig] = useState({ fields: [] });
  const [extraActionConfig, setExtraActionConfig] = useState({
    roleConfig: {},
    privilegeConfig: {}
  });

  const usersHook = useUsers({ setLoading, setError, setInfo, setReload });
  const rolesHook = useRoles({ setLoading, setError, setInfo, setReload });
  const privilegesHook = usePrivileges({ setLoading, setError, setInfo, setReload });

  useEffect(() => {
    const loadOptions = async () => {
      const roles = await rolesHook.getRoleList({
        pageIndex: null,
        pageLength: null,
        search: null
      });

      const privileges = await privilegesHook.getPrivilegeList({
        pageIndex: null,
        pageLength: null,
        search: null
      });

      const injectDynamicOptions = (fields) =>
        fields.map((f) => {
          if (f.name === "roleCodes") {
            return {
              ...f,
              options: roles.map((r) => ({
                value: r.code,
                label: r.name,
              })),
            };
          }

          if (f.name === "userRoles") {
            return {
              ...f,
              options: roles.map((r) => ({
                value: r.roleID,
                label: r.name,
              })),
            };
          }

          if (f.name === "userPrivileges") {
            return {
              ...f,
              options: privileges.map((p) => ({
                value: p.privilegeID,
                label: p.name,
              })),
            };
          }

          return f;
        });

      // Forms
      setCreateConfig({ fields: injectDynamicOptions(userCreateFields) });
      setUpdateConfig({ fields: injectDynamicOptions(userUpdateFields) });

      // Toggle Action Configs
      setExtraActionConfig({
        roleConfig: {
          ...userRoleToggleConfig,
          options: roles.map((r) => ({
            value: r.roleID,
            label: r.name,
          })),
        },
        privilegeConfig: {
          ...userPrivilegeToggleConfig,
          options: privileges.map((p) => ({
            value: p.privilegeID,
            label: p.name,
          })),
        },
      });
    };

    loadOptions();
  }, []);

  return {
    // Metadata
    userMetadata,

    // CRUD operations
    fetchList: usersHook.getSortedUserList,
    fetchById: usersHook.getUserById,
    createEntity: usersHook.addUser,
    updateEntity: usersHook.updateUser,
    deleteEntity: usersHook.deleteUser,

    // Toggle actions
    updateUserRole: usersHook.updateUserRole,
    updateUserPrivilege: usersHook.updateUserPrivilege,

    // Dynamic configs
    userColumns,
    userBuildQueryParams,
    userDetailFields,
    userIdField,
    columnTemplate,

    // Form configs
    createConfig,
    updateConfig,
    extraActionConfig,
  };
}
