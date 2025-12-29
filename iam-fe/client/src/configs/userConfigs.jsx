import UserIcon from '../assets/icon/user.png';

// ID field for generic CRUD
export const userIdField = "userID";

// Metadata
export const userMetadata = {
  icon: UserIcon,
  entityName: "User",
  title: "User Management",
  description: "Manage system users, their profiles, and access permissions.",
  meta: [
    { label: "Service", value: "IAM User Management" },
    { label: "Version", value: "v1.2.3" },
    { label: "Maintainer", value: "BlueCat Team" },
  ],
};

// Columns for list view
export const userColumns = [
  { key: "fullName", label: "Full Name", filterable: true, filterType: "text" },
  { key: "email", label: "Email", sortable: true, sortKey: "SORT_BY_EMAIL", filterable: false },
  {
    key: "gender", label: "Gender", sortable: true, sortKey: "SORT_BY_GENDER", filterable: true, filterType: "select",
    options: [
      { value: "Male", label: "Male" },
      { value: "Female", label: "Female" }
    ]
  }
];

export const columnTemplate = "1.5fr 2fr 1fr 3fr";

// Query builder
export const userBuildQueryParams = ({ filters, sortBy, currentPage, pageSize }) => ({
  sortBy: sortBy || "SORT_BY_IDENTITY",
  pageIndex: currentPage,
  pageLength: pageSize,
  search: filters.fullName || "", // column keys
  gender: filters.gender || "",
  isActive: filters.isActive ?? null,
  dateOfBirthFrom: filters.dateOfBirthRange?.from || null,
  dateOfBirthTo: filters.dateOfBirthRange?.to || null,
});

// Create form fields
export const userCreateFields = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "email", label: "Email", type: "email" },
  { name: "gender", label: "Gender", type: "select", options: ["Female", "Male"] },
  { name: "dob", label: "Date of Birth", type: "date" },
  { name: "roleCodes", label: "Roles", type: "multiple-choice", options: [] },
];

// Update form fields
export const userUpdateFields = [
  { name: "fullName", label: "Full Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "gender", label: "Gender", type: "select", options: ["Female", "Male"] },
  { name: "dob", label: "Date of Birth", type: "date" },
];

// Detail view config
export const userDetailFields = [
  { key: "userID", label: "User ID" },
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "gender", label: "Gender" },
  { key: "dob", label: "Date of Birth" },
  { key: "isActive", label: "Status", transform: val => (val ? "Active" : "Inactive") },

  // Roles
  {
    key: "userRoles",
    label: "Roles",
    type: "list",
    listClass: "roles-container",
    itemClass: "role-card-detail",
    renderItem: (userRole) => (
      <div className="flex-between w-full">
        <span>{userRole.role.name}</span>
        <span
          className={`status-badge ${userRole.isActive ? "status-active" : "status-inactive"
            }`}
        >
          {userRole.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    ),
  },

  // Privileges
  {
    key: "userPrivileges",
    label: "Privileges",
    type: "list",
    listClass: "privilege-list",
    itemClass: "privilege-item",
    renderItem: (p) => (
      <div className="flex-between w-full">
        <span>
          {p.privilege.name} — {p.privilege.description}
        </span>
        <span
          className={`status-badge ${p.isGranted ? "status-granted" : "status-revoked"
            }`}
        >
          {p.isGranted ? "Granted" : "Revoked"}
        </span>
      </div>
    ),
  },
];

// Extra configs
export const userRoleToggleConfig = {
  name: "userRoles",
  label: "Roles",
  type: "toggle-list",

  sourceKey: "userRoles",
  idKey: "roleID",
  valueKey: "isActive",
  trueLabel: "Active",
  falseLabel: "Inactive",

  options: []
};

export const userPrivilegeToggleConfig = {
  name: "userPrivileges",
  label: "Privileges",
  type: "toggle-list",

  sourceKey: "userPrivileges",
  idKey: "privilegeID",
  valueKey: "isGranted",
  trueLabel: "Granted",
  falseLabel: "Revoked",

  options: []
};
