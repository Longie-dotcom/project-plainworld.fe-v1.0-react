import CrudPage from "../../common/crud-page/crud-page";
import ToggleListEditor from "../../common/toggle-list-editor/toggle-list-editor";
import InfoBox from "../../common/info-box/info-box";
import Loading from "../../common/loading/loading";

import React, { useState } from "react";
import { useRoleCrud } from "../../hooks/crud/useRoleCrud";

function RoleManagement() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);

    const [selectedRole, setSelectedRole] = useState(null);
    const [showPrivilegeEditor, setShowPrivilegeEditor] = useState(false);

    const {
        // Metadata
        roleMetadata,

        // CRUD operations
        fetchList,
        fetchById,
        createEntity,
        updateEntity,
        deleteEntity,

        updateRolePrivilege,

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
    } = useRoleCrud({
        setError,
        setInfo,
        setLoading,
        setReload
    });

    const { privilegeConfig } = extraActionConfig;

    const rowActionConfig = [
        {
            label: "Edit Privileges",
            onClick: (role) => {
                setSelectedRole(role);
                setShowPrivilegeEditor(true);
            }
        }
    ];

    const handleSavePrivileges = async (selectedIDs) => {
        if (!selectedRole) return;

        await updateRolePrivilege({
            id: selectedRole.roleID,
            privilegeID: selectedIDs
        });

        setShowPrivilegeEditor(false);
        setSelectedRole(null);
    };

    return (
        <>
            <CrudPage
                metadata={roleMetadata}
                idField={roleIdField}
                fetchList={fetchList}
                fetchById={fetchById}
                createEntity={createEntity}
                updateEntity={updateEntity}
                deleteEntity={deleteEntity}
                reload={reload}
                columns={roleColumns}
                pageSize={5}
                buildQueryParams={roleBuildQueryParams}
                createConfig={createConfig}
                updateConfig={updateConfig}
                detailFields={roleDetailFields}
                rowActionConfig={rowActionConfig}
                columnTemplate={columnTemplate}
            />

            {/* ----- Privilege Editor ----- */}
            {showPrivilegeEditor && selectedRole && (
                <ToggleListEditor
                    title={`Manage Privileges — ${selectedRole.name}`}
                    entity={selectedRole}
                    sourceKey={privilegeConfig.sourceKey}
                    idKey={privilegeConfig.idKey}
                    valueKey={privilegeConfig.valueKey}
                    options={privilegeConfig.options}
                    trueLabel={privilegeConfig.trueLabel}
                    falseLabel={privilegeConfig.falseLabel}
                    onSubmit={handleSavePrivileges}
                    onClose={() => setShowPrivilegeEditor(false)}
                />
            )}

            {/* ----- Notifications ----- */}
            {loading && <Loading />}
            {error && <InfoBox title="Error" message={error} onClose={() => setError(null)} />}
            {info && <InfoBox title="Information" message={info} onClose={() => setInfo(null)} />}
        </>
    );
}

export default RoleManagement;
