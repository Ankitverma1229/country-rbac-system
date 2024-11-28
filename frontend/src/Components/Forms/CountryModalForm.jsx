import React, { useState, useEffect } from "react";
import { updateCountryDetails, addCountryDetails } from "../../Services/DataServices";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, resetNewEntryState, triggerTableRefresh } from "../../Store/UserSlice";

const CountryModalForm = () => {
  const dispatch = useDispatch();
  const { selectedCountry, isModalOpen, isNewEntry } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    country: "",
    title: "",
    description: "",
    gdp: "",
    population: "",
    mainLanguages: "",
    popularCities: "",
    weather: {
      temperature: "",
      humidity: "",
    },
  });

  useEffect(() => {
    if (isModalOpen) {
      setFormData(
        isNewEntry
          ? {
            country: "",
            title: "",
            description: "",
            gdp: "",
            population: "",
            mainLanguages: "",
            popularCities: "",
            weather: {
              temperature: "",
              humidity: "",
            },
          }
          : {
            country: selectedCountry?.country || "",
            title: selectedCountry?.title || "",
            description: selectedCountry?.description || "",
            gdp: (selectedCountry?.gdp / 1e12 || "").toString(),
            population: (selectedCountry?.population / 1e6 || "").toString(),
            mainLanguages: selectedCountry?.mainLanguages?.join(", ") || "",
            popularCities: selectedCountry?.popularCities?.join(", ") || "",
            weather: {
              temperature: selectedCountry?.weather?.temperature || "",
              humidity: selectedCountry?.weather?.humidity || "",
            },
          }
      );
    }
  }, [isModalOpen, selectedCountry, isNewEntry]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("weather.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        weather: { ...prev.weather, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      gdp: parseFloat(formData.gdp) * 1e12,
      population: parseFloat(formData.population) * 1e6,
      mainLanguages: formData.mainLanguages.split(",").map((s) => s.trim()),
      popularCities: formData.popularCities.split(",").map((s) => s.trim()),
    };

    isNewEntry
      ? await addCountryDetails(updatedData)
      : await updateCountryDetails(updatedData, selectedCountry._id);

    dispatch(closeModal());
    dispatch(resetNewEntryState());
    dispatch(triggerTableRefresh());
  };

  const handleClose = () => {
    dispatch(closeModal());
    dispatch(resetNewEntryState());
  };

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
        onClick={handleClose}
      >
        <div
          className="bg-white mx-2 mt-8 md:mt-0 md:mx-0 p-4 sm:p-6 rounded-lg shadow-lg w-full  sm:max-w-sm md:max-w-lg lg:max-w-3xl overflow-y-auto max-h-full"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
            {isNewEntry ? "Add New Country" : "Edit Country Details"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInput("text", "country", "Country Name")}
              {renderInput("text", "title", "Title")}
              {renderInput("text", "description", "Description")}
              {renderInput("text", "gdp", "GDP (Trillions)")}
              {renderInput("text", "population", "Population (Millions)")}
              {renderInput("text", "mainLanguages", "Main Languages (Comma-separated)")}
              {renderInput("text", "popularCities", "Popular Cities (Comma-separated)")}
              {renderInput("text", "weather.temperature", "Weather Temperature (°C)")}
              {renderInput("text", "weather.humidity", "Weather Humidity (%)")}
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="px-3 py-2 text-sm bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isNewEntry ? "Add Country" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

    )
  );

  function renderInput(type, name, label) {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={name.startsWith("weather.") ? formData.weather[name.split(".")[1]] : formData[name]}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm bg-gray-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
    );
  }
};

export default CountryModalForm;
