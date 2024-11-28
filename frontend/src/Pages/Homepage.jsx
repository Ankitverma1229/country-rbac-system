import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import Header from "../Components/Header/Header";
import CountryModalForm from "../Components/Forms/CountryModalForm";
import { useDispatch, useSelector } from "react-redux";
import { verfiyUser } from "../Services/AuthServices";

const Homepage = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isModalOpen, image } = useSelector((state) => state.user);

  const toggleSidebar = () => setIsSidebarVisible((prev) => !prev);

  const getUserDetails = async () => {
    await verfiyUser(dispatch);
  };

  useEffect(() => {
    getUserDetails();
    navigate("/home/dashboard");
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
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
          <main>
            <Outlet />
          </main>
          {isModalOpen && <CountryModalForm />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
