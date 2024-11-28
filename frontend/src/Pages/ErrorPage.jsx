import React from "react";
import ErrorPageImage from "../../assets/error_page.svg";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-gray-100">
      <div className="w-11/12 max-w-md">
        <img
          src={ErrorPageImage}
          alt="An illustration representing an error page"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
