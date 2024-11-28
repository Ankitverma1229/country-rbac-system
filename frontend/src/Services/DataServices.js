import axios from "axios";
import { toast } from "react-toastify";
import { verfiyUser } from "./AuthServices";

const BackendURL = import.meta.env.VITE_BACKEND_BASE_URL;

export const addCountryDetails = async (countryInfo) => {
  try {
    const response = await axios.post(`${BackendURL}/create`, countryInfo, {
      withCredentials: true,
    });
    if (response) {
      toast.success(response.data.message);
      return response.data;
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message ||
        "Error in adding country details try again"
    );
  }
};

export const getCountryDetails = async (countryInfo) => {
  try {
    const response = await axios.get(`${BackendURL}/data`, {
      params: { country: countryInfo },
      withCredentials: true,
    });
    if (response) {
      return {
        data: response.data.data,
        role: response.data.role,
      };
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in reteriving details try again"
    );
  }
};

export const getAllCountryDetails = async () => {
  try {
    const response = await axios.get(`${BackendURL}/all-data`, {
      withCredentials: true,
    });
    if (response) {
      return {
        data: response.data.data,
        role: response.data.role,
        country: response.data.country,
      };
    }
  } catch (error) {
    toast.error(error.response.data.message);
    throw new Error(
      error.response?.data?.message || "Error in reteriving details try again"
    );
  }
};

export const updateCountryDetails = async (countryInfo, id) => {
  try {
    const response = await axios.put(
      `${BackendURL}/update/${id}`,
      countryInfo,
      { withCredentials: true }
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

export const deleteCountryDetails = async (id) => {
  try {
    const response = await axios.delete(`${BackendURL}/delete/${id}`, {
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
