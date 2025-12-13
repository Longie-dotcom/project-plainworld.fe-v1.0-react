import UserManagement from "../../component/user-management/user-management";
import RoleManagement from "../../component/role-management/role-management";
import PrivilegeManagement from "../../component/privilege-management/privilege-management";
import ChangePassword from "../../component/change-password/change-password";
import InfoBox from "../../common/info-box/info-box";
import Loading from "../../common/loading/loading";
import ConfirmBox from "../../common/confirm-box/confirm-box";
import IconHover from "../../common/icon-hover/icon-hover";

import "./dashboard.css";
import UserIcon from "../../assets/icon/user.png";
import UserIconContrast from "../../assets/icon/user-1.png";
import SettingIcon from "../../assets/icon/settings.png";
import SettingIconContrast from "../../assets/icon/settings-1.png";
import TicketIcon from "../../assets/icon/ticket.png";
import TicketIconContrast from "../../assets/icon/ticket-1.png";
import LockIcon from "../../assets/icon/lock-keyhole.png";
import LockIconContrast from "../../assets/icon/lock-keyhole-1.png";
import LogoutIcon from "../../assets/icon/log-out.png";
import LogoutIconContrast from "../../assets/icon/log-out-1.png";
import MailIcon from "../../assets/icon/mail.png";
import ChartIcon from "../../assets/icon/chart-column-big.png";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignalHub } from "../../api/useSignalHub";
import { useAuths } from "../../hooks/raw/useAuths";

function Dashboard() {
  const tabs = [
    {
      id: "user-management",
      label: "User management",
      component: <UserManagement />,
      icon: UserIcon,
      hoverIcon: UserIconContrast
    },
    {
      id: "role-management",
      label: "Role management",
      component: <RoleManagement />,
      icon: SettingIcon,
      hoverIcon: SettingIconContrast
    },
    {
      id: "privilege-management",
      label: "Privilege management",
      component: <PrivilegeManagement />,
      icon: TicketIcon,
      hoverIcon: TicketIconContrast
    },
    {
      id: "change-password",
      label: "Change password",
      component: <ChangePassword />,
      icon: LockIcon,
      hoverIcon: LockIconContrast
    },
    {
      id: "logout",
      label: "Logout",
      isAction: true,
      icon: LogoutIcon,
      hoverIcon: LogoutIconContrast
    }
  ];

  useSignalHub();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(false);
  const [confirm, setConfirm] = useState(null);

  const navigate = useNavigate();
  const { logout, getCurrentUser } = useAuths({ setError, setLoading, setInfo });
  const currentUser = getCurrentUser();
  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <div id="dashboard">
      {/* Top header */}
      <div className="dashboard-header">
        <div className="dashboard-header-left">
          <IconHover src={ChartIcon} allowHover={false} />
          <div>IAM Service Dashboard</div>
        </div>
        <div className="dashboard-header-right">
          <span className="user-name">
            <IconHover src={UserIcon} allowHover={false} />
            {currentUser?.fullName || "Unknown User"}
          </span>
          <span className="user-role">
            <IconHover src={SettingIcon} allowHover={false} />
            {currentUser?.role || "No Role"}
          </span>
          <span className="user-email">
            <IconHover src={MailIcon} allowHover={false} />
            {currentUser?.email}
          </span>
        </div>
      </div>

      {/* Bottom content: Sidebar + Main */}
      <div className="dashboard-body">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="sidebar-tabs">
            {tabs.map(tab => {
              const [hovered, setHovered] = useState(false);
              const showHoverImage = hovered || activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  className={
                    activeTab === tab.id && !tab.isAction
                      ? "dash-board-button-active"
                      : "dash-board-button-inactive"
                  }
                  onClick={() => {
                    if (tab.isAction) {
                      setConfirm("Do you want to logout?");
                    } else {
                      setActiveTab(tab.id);
                    }
                  }}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  {tab.icon && (
                    <IconHover
                      src={tab.icon}
                      hoverSrc={tab.hoverIcon}
                      hoveredExternally={showHoverImage}
                    />
                  )}
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ----- Sidebar Footer ----- */}
          <div className="sidebar-footer">
            <div className="meta-info">
              <span>IAM Service v1.0.0</span>
              <br />
              <span>© 2025 BlueCat Company</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="dashboard-main">
          {currentTab?.component}
        </div>
      </div>

      {loading && <Loading />}
      {error && <InfoBox message={error} onClose={() => setError(null)} title="Error" />}
      {info && <InfoBox message={info} onClose={() => setInfo(null)} title="Information" />}
      {confirm && (
        <ConfirmBox
          visible={!!confirm}
          message={confirm}
          onConfirm={() => {
            logout();
            setConfirm(null);
            navigate('/login');
          }}
          onCancel={() => setConfirm(null)}
        />
      )}
    </div>
  );
}

export default Dashboard;
