import axios from "axios";
import { toast } from "react-toastify";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const getAllUser = async () => {
  try {
    const response = await axios.get(`${BackendURL}/user/profiles`, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in reteriving details try again"
    );
  }
};

export const updateUserProfile = async (updates, id) => {
  try {
    const response = await axios.put(
      `${BackendURL}/user/update/${id}`,
      updates,
      {
        withCredentials: true,
      }
    );
    if (response) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in reteriving details try again"
    );
  }
};

export const requestForAdminRole = async () => {
  try {
    const response = await axios.post(
      `${BackendURL}/user/request-admin`,
      {},
      { withCredentials: true }
    );
    if (response) {
      toast.success(response.data.message);
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in sending request"
    );
  }
};
