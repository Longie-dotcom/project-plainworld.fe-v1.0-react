import CrudPage from "../../common/crud-page/crud-page";
import ToggleListEditor from "../../common/toggle-list-editor/toggle-list-editor";
import InfoBox from "../../common/info-box/info-box";
import Loading from "../../common/loading/loading";

import React, { useState } from "react";
import { useUserCrud } from "../../hooks/crud/useUserCrud";

function UserManagement() {
    const [loading, setLoading] = useState(false);
    const [info, setInfo] = useState(null);
    const [error, setError] = useState(null);
    const [reload, setReload] = useState(0);

    const [selectedUser, setSelectedUser] = useState(null);
    const [showRoleEditor, setShowRoleEditor] = useState(false);
    const [showPrivilegeEditor, setShowPrivilegeEditor] = useState(false);

    const {
        // Metadata
        userMetadata,

        // CRUD operations
        fetchList,
        fetchById,
        createEntity,
        updateEntity,
        deleteEntity,

        updateUserRole,
        updateUserPrivilege,

        // Config definitions
        userColumns,
        userBuildQueryParams,
        userDetailFields,
        userIdField,
        columnTemplate,

        // Form configs
        createConfig,
        updateConfig,
        extraActionConfig,
    } = useUserCrud({
        setError,
        setInfo,
        setLoading,
        setReload
    });

    const {
        roleConfig,
        privilegeConfig
    } = extraActionConfig;

    const rowActionConfig = [
        {
            label: "Edit Roles",
            onClick: (user) => {
                setSelectedUser(user);
                setShowRoleEditor(true);
            }
        },
        {
            label: "Edit Privileges",
            onClick: (user) => {
                setSelectedUser(user);
                setShowPrivilegeEditor(true);
            }
        }
    ];

    const handleSaveRoles = async (values) => {
        if (!selectedUser) return;
        await updateUserRole({ id: selectedUser.userID, items: values });
        setShowRoleEditor(false);
        setSelectedUser(null);
    };

    const handleSavePrivileges = async (values) => {
        if (!selectedUser) return;
        await updateUserPrivilege({ id: selectedUser.userID, items: values });
        setShowPrivilegeEditor(false);
        setSelectedUser(null);
    };

    return (
        <>
            <CrudPage
                metadata={userMetadata}
                idField={userIdField}
                fetchList={fetchList}
                fetchById={fetchById}
                createEntity={createEntity}
                updateEntity={updateEntity}
                deleteEntity={deleteEntity}
                reload={reload}
                columns={userColumns}
                pageSize={5}
                buildQueryParams={userBuildQueryParams}
                createConfig={createConfig}
                updateConfig={updateConfig}
                detailFields={userDetailFields}
                rowActionConfig={rowActionConfig}
                columnTemplate={columnTemplate}
            />

            {/* ----- Role Editor ----- */}
            {showRoleEditor && selectedUser && (
                <ToggleListEditor
                    title={`${roleConfig.label} for ${selectedUser.fullName}`}
                    entity={selectedUser}
                    sourceKey={roleConfig.sourceKey}
                    idKey={roleConfig.idKey}
                    valueKey={roleConfig.valueKey}
                    options={roleConfig.options}
                    onSubmit={handleSaveRoles}
                    onClose={() => setShowRoleEditor(false)}
                    falseValue={roleConfig.falseLabel}
                    trueValue={roleConfig.trueLabel}
                />
            )}

            {/* ----- Privilege Editor ----- */}
            {showPrivilegeEditor && selectedUser && (
                <ToggleListEditor
                    title={`${privilegeConfig.label} for ${selectedUser.fullName}`}
                    entity={selectedUser}
                    sourceKey={privilegeConfig.sourceKey}
                    idKey={privilegeConfig.idKey}
                    valueKey={privilegeConfig.valueKey}
                    options={privilegeConfig.options}
                    onSubmit={handleSavePrivileges}
                    onClose={() => setShowPrivilegeEditor(false)}
                    falseValue={privilegeConfig.falseLabel}
                    trueValue={privilegeConfig.trueLabel}
                />
            )}

            {/* ----- Notifications ----- */}
            {loading && <Loading />}
            {error && <InfoBox title="Error" message={error} onClose={() => setError(null)} />}
            {info && <InfoBox title="Information" message={info} onClose={() => setInfo(null)} />}
        </>
    );
}

export default UserManagement;
