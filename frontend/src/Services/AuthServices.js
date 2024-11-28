import axios from "axios";
import { toast } from "react-toastify";
import { setUserDetails } from "../Store/UserSlice";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const registerUser = async (userInfo) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/register`, userInfo);
    if (response) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in registration try again"
    );
  }
};

export const sendUserLoginInfo = async (userInfo, navigate) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/login`, userInfo, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      navigate("/home");
      return response.data.userDetails;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in login try again"
    );
  }
};

export const sendAdminLoginInfo = async (userInfo, navigate) => {
  try {
    const response = await axios.post(`${BackendURL}/auth/admin`, userInfo, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      navigate("/home");
      return response.data.adminDetails;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in login try again"
    );
  }
};

export const verfiyUser = async (dispatch) => {
  try {
    const response = await axios.get(`${BackendURL}/auth/verify`, {
      withCredentials: true,
    });
    if (response) {
      dispatch(setUserDetails(response.data.userDetails));
    }
  } catch (error) {
    throw new Error(error);
  }
};
