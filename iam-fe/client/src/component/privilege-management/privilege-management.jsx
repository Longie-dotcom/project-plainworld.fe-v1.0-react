import CrudPage from "../../common/crud-page/crud-page";
import InfoBox from "../../common/info-box/info-box";
import Loading from "../../common/loading/loading";

import React, { useState } from "react";
import { usePrivilegeCrud } from "../../hooks/crud/usePrivilegeCrud";

function PrivilegeManagement() {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(0);
  
  const {
    // Metadata
    privilegeMetadata,

    // CRUD operations
    fetchList,
    fetchById,
    createEntity,
    updateEntity,
    deleteEntity,

    // Config definitions
    privilegeColumns,
    privilegeBuildQueryParams,
    privilegeDetailFields,
    privilegeIdField,
    columnTemplate,

    // Form configs
    createConfig,
    updateConfig
  } = usePrivilegeCrud({
    setError,
    setInfo,
    setLoading,
    setReload
  });

  return (
    <>
      <CrudPage
        metadata={privilegeMetadata}
        idField={privilegeIdField}
        fetchList={fetchList}
        fetchById={fetchById}
        createEntity={createEntity}
        updateEntity={updateEntity}
        deleteEntity={deleteEntity}
        reload={reload}
        columns={privilegeColumns}
        pageSize={5}
        buildQueryParams={privilegeBuildQueryParams}
        createConfig={createConfig}
        updateConfig={updateConfig}
        detailFields={privilegeDetailFields}
        columnTemplate={columnTemplate}
      />

      {/* ----- Notifications ----- */}
      {loading && <Loading />}
      {error && <InfoBox title="Error" message={error} onClose={() => setError(null)} />}
      {info && <InfoBox title="Information" message={info} onClose={() => setInfo(null)} />}
    </>
  );
}

export default PrivilegeManagement;
