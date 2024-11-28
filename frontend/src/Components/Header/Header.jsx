import React, { useState, useEffect, useRef } from "react";
import { PanelLeftOpen, PanelRightOpen, LayoutDashboard, Users, Globe, LogOut, Voicemail, BellIcon, ChevronDownIcon, } from "lucide-react";
import GeoAccessLogo from "../../../assets/geo-access-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { requestForAdminRole } from "../../Services/UserServices";
import { clearUserDetails } from "../../Store/UserSlice";
import SendingRequestAnimation from "../Animations/SendingRequest";

const Header = () => {
  const { name, email, role, image } = useSelector((state) => state.user);
  const isAdminOrSuperAdmin = role === "Admin" || role === "Super Admin";
  const [isRequesting, setIsRequesting] = useState(false);
  const [isHeaderOpen, setIsHeaderOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleHeader = () => {
    setIsHeaderOpen(!isHeaderOpen);
  };

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

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsHeaderOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <>
      <div className="md:hidden">
        <header
          className={` bg-[#cbd7dc] shadow-lg z-50 transition-all duration-300 ease-in-out ${isHeaderOpen ? "h-auto" : "h-16"
            }`}
        >
          <div className="flex items-center justify-between px-4 py-2">
            <Link to={'/home'} className="flex items-center gap-4">
              <img
                src={GeoAccessLogo}
                alt="GeoAccess Logo"
                className="h-10 w-8"
              />
              <span className="font-semibold text-xl">GeoAccess</span>
            </Link>

            <div className="flex items-center gap-4">
              <button onClick={toggleHeader}>
                {isHeaderOpen ? <PanelRightOpen /> : <PanelLeftOpen />}
              </button>
            </div>
          </div>

          {isHeaderOpen && (
            <nav ref={menuRef} className="flex flex-col space-y-2 p-4">
              <div className="text-lg flex items-center gap-5 font-semibold text-gray-800  pb-2">
                <img
                  src={image || ""}
                  alt="User Avatar"
                  className="h-10 w-10 rounded-full border border-gray-300"
                />
                <span className="font-medium text-gray-800">{`Hello, ${name}!`}</span>
              </div>
              <HeaderItem
                icon={<LayoutDashboard />}
                label="Dashboard"
                onClick={() => {
                  setIsHeaderOpen(false);
                  navigate("/home");
                }}
              />
              {isAdminOrSuperAdmin && (
                <HeaderItem
                  icon={<Users />}
                  label="All Users"
                  onClick={() => {
                    setIsHeaderOpen(false);
                    navigate("/home/users");
                  }}
                />
              )}
              <HeaderItem
                icon={<Globe />}
                label="Countries"
                onClick={() => {
                  setIsHeaderOpen(false);
                  navigate("/home/countries");
                }}
              />
              {role === "Viewer" && (
                <HeaderButton
                  icon={<Voicemail />}
                  label="Request admin role"
                  onClick={() => {
                    setIsHeaderOpen(false);
                    handleRequestAdminRole();
                  }}
                  isRequesting={isRequesting}
                />
              )}
              <HeaderButton
                icon={<LogOut />}
                label="Logout"
                onClick={() => {
                  setIsHeaderOpen(false);
                  handleLogoutOption();
                }}
                textClass="text-red-600"
                hoverClass="hover:text-red-600"
              />
            </nav>
          )}
        </header>
        {isRequesting && (
          <div className="fixed inset-0 bg-sky-400 bg-opacity-20 z-50 flex justify-center items-center">
        
            <SendingRequestAnimation text = { <>Sending Request for <i>Admin</i> Role....</>}/>
          </div>
        )}
      </div>
      <div className=" justify-between hidden md:flex items-center p-4 px-6 bg-[#dfecf2] shadow-md relative ">
        <div>
          <h1 className="text-xl md:text-3xl font-bold tracking-tight text-gray-900">
            {getGreeting()},{" "}
            {name &&
              name.split(" ")[0].charAt(0).toUpperCase() +
              name.split(" ")[0].slice(1)}
            !
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <BellIcon className="w-5 h-5 text-gray-600" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-8">
              <img
                src={image}
                alt="User"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </div>
    </>
  );
};

const HeaderItem = ({ icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-200 transition-all duration-300"
  >
    <span className="h-5 w-5 mr-2">{icon}</span>
    <span>{label}</span>
  </button>
);

const HeaderButton = ({
  icon,
  label,
  onClick,
  isRequesting = false,
  textClass = "text-gray-700",
  hoverClass,
}) => (
  <button
    onClick={onClick}
    disabled={isRequesting}
    className={`flex items-center gap-2 p-3 bg-white rounded-md shadow-md transition-all duration-300 ${isRequesting
        ? "opacity-50 cursor-not-allowed"
        : `hover:bg-gray-200 cursor-pointer ${hoverClass || ""}`
      }`}
  >
    <span className={`h-5 w-5 ${textClass}`}>{icon}</span>
    <span className={`font-medium ${textClass}`}>
      {isRequesting ? "Requesting..." : label}
    </span>
  </button>
);

export default Header;
