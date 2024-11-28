import React, { useState } from "react";
import AuthForm from "../Components/Forms/AuthForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-lg mx-4 md:mx-0 p-4 md:p-8 bg-gray-200 shadow-lg rounded-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        {isLogin ? (
          <p className="text-sm text-gray-500 text-center mb-6">
            <span className="block mb-2">
              <span className="font-semibold">Admin Test ID:</span>{" "}
              admin@gmail.com |<span className="font-semibold"> Password:</span>{" "}
              admin@123
            </span>
            <span>
              <span className="font-semibold">User Test ID:</span>{" "}
              user@gmail.com |<span className="font-semibold"> Password:</span>{" "}
              pass@123
            </span>
          </p>
        ) : (
          ""
        )}
        <AuthForm isLogin={isLogin} />
        <p className="text-center text-gray-600 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="text-gray-800 font-semibold hover:text-blue-500 transition"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
