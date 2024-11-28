import React, { useState } from "react";
import {
  registerUser,
  sendUserLoginInfo,
  sendAdminLoginInfo,
} from "../../Services/AuthServices";
import { useNavigate } from "react-router-dom";
import SendingRequestAnimation from "../Animations/SendingRequest";

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const { name, email, password, confirmPassword, isAdmin } = formData;

      const user = { email, password };
      let response;

      if (isLogin) {
        response = isAdmin
          ? await sendAdminLoginInfo(user, navigate)
          : await sendUserLoginInfo(user, navigate);
      } else {
        response = await registerUser({
          name,
          email,
          password,
          confirmPassword,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (type, name, placeholder, required = true) => (
    <div>
      <input
        type={type}
        id={name}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-gray-200 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && renderInput("text", "name", "Enter your name")}
        {renderInput("email", "email", "Enter your email")}
        {renderInput("password", "password", "Enter your password")}
        {!isLogin &&
          renderInput("password", "confirmPassword", "Confirm your password")}

        {isLogin && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              className="mr-2 focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="isAdmin" className="text-gray-700">
              Login as Admin
            </label>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-gray-800 text-white py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      {loading && (
        <div className="fixed inset-0 bg-sky-400 bg-opacity-20 z-50 flex justify-center items-center">
          <SendingRequestAnimation  text = {"Validating user details ...."}/>
        </div>
      )}
    </>
  );
};

export default AuthForm;
