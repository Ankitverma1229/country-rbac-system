import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import CountryModalForm from "../Components/Forms/CountryModalForm";
import { useDispatch, useSelector } from "react-redux";
import { verfiyUser } from "../Services/AuthServices";
import Dashboard from "./Dashboard";

const Homepage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const dispatch = useDispatch();
  const { isModalOpen, image } = useSelector((state) => state.user);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  const getUserDetails = async () => {
    await verfiyUser(dispatch);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const location = useLocation();

  // Check if the current location has an outlet (nested route) or not
  const isOutletPresent = location.pathname !== "/home";
  return (
    <>
      <div className="flex bg-[#dfecf2] h-screen overflow-hidden">
        <Sidebar
          isSidebarVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />

        <div
          className={`flex-1 flex flex-col overflow-auto transition-all duration-300 ${
            isSidebarVisible ? "ml-64 md:ml-0" : "ml-0"
          }`}
        >
          <Header toggleSidebar={toggleSidebar} />
          {!isOutletPresent && <Dashboard />}

          <main>{isOutletPresent && <Outlet />}</main>
          {isModalOpen && <CountryModalForm />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
