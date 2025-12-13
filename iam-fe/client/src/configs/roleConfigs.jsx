import RoleIcon from '../assets/icon/settings.png';

// ID field for generic CRUD
export const roleIdField = "roleID";

// Metadata
export const roleMetadata = {
  icon: RoleIcon,
  entityName: "Role",
  title: "Role Management",
  description: "Manage all user roles, their privileges, and assignments within the system.",
  meta: [
    { label: "Service", value: "IAM Role Management" },
    { label: "Version", value: "v1.2.3" },
    { label: "Maintainer", value: "BlueCat Team" },
  ],
};

// Columns for list view
export const roleColumns = [
  { key: "code", label: "Role Code", filterable: true, filterType: "text" },
  { key: "name", label: "Role Name" },
  { key: "description", label: "Description" }
];

export const columnTemplate = "1fr 1fr 3fr 2.5fr";

// Query builder
export const roleBuildQueryParams = ({ filters, currentPage, pageSize }) => ({
  pageIndex: currentPage,
  pageLength: pageSize,
  search: filters.code || filters.name || "" // column keys
});

// Create form fields
export const roleCreateFields = [
  { name: "code", label: "Role Code", type: "text" },
  { name: "name", label: "Role Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  {
    name: "privilegeID",
    label: "Privileges",
    type: "multiple-choice",
    options: []
  }
];

// Update form fields
export const roleUpdateFields = [
  { name: "name", label: "Role Name", type: "text" },
  { name: "description", label: "Description", type: "text" }
];

// Detail view config
export const roleDetailFields = [
  { key: "code", label: "Role Code" },
  { key: "name", label: "Role Name" },
  { key: "description", label: "Description" },
  {
    key: "rolePrivileges",
    label: "Privileges",
    type: "list",
    listClass: "privilege-list",
    itemClass: "privilege-item",
    renderItem: p => `${p.name} — ${p.description}`
  }
];

// Extra toggle config (same structure as user extra configs)
export const rolePrivilegeToggleConfig = {
  name: "rolePrivileges",
  label: "Privileges",
  type: "toggle-list",

  sourceKey: "rolePrivileges",
  idKey: "privilegeID",
  valueKey: null, // rolePrivileges has no boolean
  trueLabel: null,
  falseLabel: null,

  options: []
};
