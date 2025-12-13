import { useState, useEffect } from "react";
import { usePrivileges } from "../raw/usePrivileges";
import { useRoles } from "../raw/useRoles";
import {
  roleMetadata,
  roleColumns,
  roleBuildQueryParams,
  roleDetailFields,
  roleIdField,
  columnTemplate,
  roleCreateFields,
  roleUpdateFields,
  rolePrivilegeToggleConfig
} from "../../configs/roleConfigs";

export function useRoleCrud({ setLoading, setError, setInfo, setReload }) {
  const [createConfig, setCreateConfig] = useState({ fields: [] });
  const [updateConfig, setUpdateConfig] = useState({ fields: [] });
  const [extraActionConfig, setExtraActionConfig] = useState({
    privilegeConfig: rolePrivilegeToggleConfig
  });

  const rolesHook = useRoles({ setLoading, setError, setInfo, setReload });
  const privilegesHook = usePrivileges({ setLoading, setError, setInfo, setReload });

  useEffect(() => {
    const load = async () => {
      try {
        const privileges = await privilegesHook.getPrivilegeList({
          pageIndex: null,
          pageLength: null,
          search: null
        });

        const privilegeOptions = privileges.map(p => ({
          value: p.privilegeID,
          label: p.name
        }));

        const inject = (fields) =>
          fields.map(f =>
            f.name === "privilegeID"
              ? { ...f, options: privilegeOptions }
              : f
          );

        setCreateConfig({ fields: inject(roleCreateFields) });
        setUpdateConfig({ fields: inject(roleUpdateFields) });

        setExtraActionConfig({
          privilegeConfig: {
            ...rolePrivilegeToggleConfig,
            options: privilegeOptions
          }
        });

      } catch (err) {
        setError(err?.response?.data?.message || "Failed loading privileges");
      }
    };

    load();
  }, []);

  return {
    // Metadata
    roleMetadata,

    // CRUD operations
    fetchList: rolesHook.getRoleList,
    fetchById: rolesHook.getRoleDetail,
    createEntity: rolesHook.addRole,
    updateEntity: rolesHook.updateRole,
    deleteEntity: rolesHook.deleteRole,

    // Toggle actions
    updateRolePrivilege: rolesHook.updateRolePrivilege,

    // Config definitions
    roleColumns,
    roleBuildQueryParams,
    roleDetailFields,
    roleIdField,
    columnTemplate,

    // Form configs
    createConfig,
    updateConfig,
    extraActionConfig,
  };
}
