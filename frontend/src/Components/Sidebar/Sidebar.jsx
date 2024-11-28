import React, { useState } from "react";
import { PanelLeftOpen, PanelRightOpen, LayoutDashboard, Users, Globe, LogOut, Voicemail } from "lucide-react";
import GeoAccessLogo from "../../../assets/geo-access-logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { requestForAdminRole } from "../../Services/UserServices";
import { clearUserDetails } from "../../Store/UserSlice";
import SendingRequestAnimation from "../Animations/SendingRequest";

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  const { role } = useSelector((state) => state.user);
  const isAdminOrSuperAdmin = role === "Admin" || role === "Super Admin";
  const [isRequesting, setIsRequesting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRequestAdminRole = async () => {
    try {
      setIsRequesting(true);
      await requestForAdminRole();
    } catch (error) {
      console.error(error);
    } finally {
      setIsRequesting(false);
    }
  };

  const handleLogout = () => {
    toast.dismiss();
    toast.success("Logged out successfully!");
    dispatch(clearUserDetails());
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  const handleLogoutOption = () => {
    toast(
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-4 w-full">
        <p className="text-sm sm:text-base">Are you sure you want to logout?</p>
        <div className="flex gap-2 justify-center sm:justify-start w-full">
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm sm:text-base w-24 sm:w-auto"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm sm:text-base w-24 sm:w-auto"
          >
            No
          </button>
        </div>
      </div>,
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );
  };

  return (
    <>
      <aside
        className={`h-screen transition-all duration-500 ease-in-out bg-[#cbd7dc] shadow-lg  hidden md:block ${isSidebarVisible ? "w-56" : "w-12 md:w-24"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="items-center flex justify-center md:justify-between p-4 mb-5">
            <div
              className={` items-center gap-2 ${isSidebarVisible ? "flex" : "hidden"
                }  md:flex`}
            >
              <img
                src={GeoAccessLogo}
                alt="GeoAccess Logo"
                className="h-10 w-8"
              />
              {isSidebarVisible && (
                <span className="font-semibold text-xl">GeoAccess</span>
              )}
            </div>
            <button onClick={toggleSidebar}>
              {isSidebarVisible ? <PanelRightOpen /> : <PanelLeftOpen />}
            </button>
          </div>

          <nav className="flex-1 space-y-1">
            <SidebarItem
              icon={<LayoutDashboard />}
              label="Dashboard"
              isSidebarVisible={isSidebarVisible}
              onClick={() => navigate("/home/dashboard")}
            />
            {isAdminOrSuperAdmin && (
              <SidebarItem
                icon={<Users />}
                label="All Users"
                isSidebarVisible={isSidebarVisible}
                onClick={() => navigate("/home/users")}
              />
            )}
            <SidebarItem
              icon={<Globe />}
              label="Countries"
              isSidebarVisible={isSidebarVisible}
              onClick={() => navigate("/home/countries")}
            />
          </nav>

          <div className="mt-auto py-2">
            <div className="flex flex-col w-full gap-2">
              {role === "Viewer" && (
                <FooterButton
                  icon={<Voicemail />}
                  label="Request admin role"
                  onClick={handleRequestAdminRole}
                  isRequesting={isRequesting}
                  isSidebarVisible={isSidebarVisible}
                />
              )}
              <FooterButton
                icon={<LogOut />}
                label="Logout"
                onClick={handleLogoutOption}
                textClass="text-red-600"
                hoverClass="hover:text-red-600"
                isSidebarVisible={isSidebarVisible}
              />
            </div>
          </div>
        </div>
      </aside>
      {isRequesting && (
        <div className="fixed inset-0 bg-sky-400 bg-opacity-20 z-50 flex justify-center items-center">
          <SendingRequestAnimation />
        </div>
      )}
    </>
  );
};

const SidebarItem = ({ icon, label, isSidebarVisible, onClick }) => (
  <button
    onClick={onClick}
    className="relative group w-full flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-500 ease-in-out"
  >
    <span
      className={`flex-shrink-0 transition-all duration-500 ease-in-out ${isSidebarVisible ? "mx-0" : "mx-auto"
        }`}
    >
      {icon}
    </span>
    {isSidebarVisible ? (
      <span className="ml-3 whitespace-nowrap">{label}</span>
    ) : (
      <span className="absolute left-full w-full ml-2 z-40 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 group-hover:opacity-100">
        {label}
      </span>
    )}
  </button>
);

const FooterButton = ({
  icon,
  label,
  onClick,
  isRequesting = false,
  isSidebarVisible,
  textClass = "text-gray-700",
  hoverClass,
}) => (
  <button
    onClick={onClick}
    disabled={isRequesting}
    className={`flex items-center mx-auto gap-2 ${isSidebarVisible ? "px-4" : "px-4 md:px-8"
      } py-3 bg-white rounded-md shadow-md transition-all duration-500 ${isRequesting
        ? "opacity-50 cursor-not-allowed"
        : `hover:bg-gray-200 cursor-pointer ${hoverClass || ""}`
      }`}
  >
    <span className={`h-5 w-5 flex justify-center items-center ${textClass}`}>
      {icon}
    </span>
    {isSidebarVisible && (
      <span
        className={`text-sm font-medium ${textClass}`}
        style={{ minWidth: "150px", textAlign: "left" }}
      >
        {isRequesting ? "Requesting..." : label}
      </span>
    )}
  </button>
);

export default Sidebar;
