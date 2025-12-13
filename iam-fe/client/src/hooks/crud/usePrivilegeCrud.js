import { useState, useEffect } from "react";
import { usePrivileges } from "../raw/usePrivileges";
import { 
  privilegeMetadata,
  privilegeColumns,
  privilegeBuildQueryParams,
  privilegeDetailFields,
  privilegeIdField,
  columnTemplate,
  privilegeCreateFields,
  privilegeUpdateFields,
} from "../../configs/privilegeConfigs";

export function usePrivilegeCrud({ setLoading, setError, setInfo, setReload }) {
  const [createConfig, setCreateConfig] = useState({ fields: [] });
  const [updateConfig, setUpdateConfig] = useState({ fields: [] });

  const privilegesHook = usePrivileges({ setLoading, setError, setInfo, setReload });

  useEffect(() => {
    setCreateConfig({ fields: privilegeCreateFields });
    setUpdateConfig({ fields: privilegeUpdateFields });
  }, []);

  return {
    // Metadata
    privilegeMetadata,

    // CRUD operations
    fetchList: privilegesHook.getPrivilegeList,
    fetchById: privilegesHook.getPrivilegeById,
    createEntity: privilegesHook.addPrivilege,
    updateEntity: privilegesHook.updatePrivilege,
    deleteEntity: privilegesHook.deletePrivilege,

    // Config definitions
    privilegeColumns,
    privilegeBuildQueryParams,
    privilegeDetailFields,
    privilegeIdField,
    columnTemplate,

    // Form configs
    createConfig,
    updateConfig
  };
}
