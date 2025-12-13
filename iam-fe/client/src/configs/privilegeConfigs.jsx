import PrivilegeIcon from '../assets/icon/ticket.png';

// ID field for generic CRUD
export const privilegeIdField = "privilegeID";

// Metadata
export const privilegeMetadata = {
  icon: PrivilegeIcon,
  entityName: "Privilege",
  title: "Privilege Management",
  description: "Define and manage system privileges that can be assigned to roles.",
  meta: [
    { label: "Service", value: "IAM Privilege Management" },
    { label: "Version", value: "v1.2.3" },
    { label: "Maintainer", value: "BlueCat Team" },
  ],
};

// Columns for list view
export const privilegeColumns = [
  { key: "name", label: "Privilege Name", filterable: true, filterType: "text" },
  { key: "description", label: "Description" },
];

export const columnTemplate = "1fr 1.5fr 1fr";

// Query builder
export const privilegeBuildQueryParams = ({ filters, currentPage, pageSize }) => ({
  pageIndex: currentPage,
  pageLength: pageSize,
  search: filters.name || "", // column keys
});

// Create form fields
export const privilegeCreateFields = [
  { name: "name", label: "Privilege Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

// Update form fields
export const privilegeUpdateFields = [
  { name: "name", label: "Privilege Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
];

// Detail view config
export const privilegeDetailFields = [
  { key: "name", label: "Privilege Name" },
  { key: "description", label: "Description" },
];
