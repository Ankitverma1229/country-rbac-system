import React from "react";
import GDPChart from "../Graphs/GDPChart";
import { useSelector } from "react-redux";
import WorldMap from "../../../assets/world_map.svg"

const VisualizationSection = ({
  data,
  formattedData,
  handleCountryChange,
  countryDetails,
}) => {
  const { country } = useSelector((state) => state.user);

  return (
    <section className="flex flex-col gap-6 lg:gap-4 lg:flex-row mb-6 mt-3">
      <div className="flex-1 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          GDP (in Trillions) by Country
        </h3>
        <div className="h-64">
          <GDPChart data={formattedData} />
        </div>
      </div>

      {data.length > 0 && (
        <div className="flex-1 bg-indigo-50 rounded-lg shadow  flex flex-col gap-4">
          <div className="w-full h-40 overflow-hidden rounded-lg mb-3">
            <img
              src={WorldMap}
              alt="background"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row p-4">
            <div className="flex-1">
              <select
                className="w-full p-2 border rounded-lg shadow focus:ring-2 focus:ring-blue-400"
                value={country || ""}
                onChange={handleCountryChange}
              >
                <option value="" disabled>
                  Select a country
                </option>
                {data.map(({ country }) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              {countryDetails && (
                <div className="mt-3">
                  <h2 className="text-md font-semibold text-gray-800">
                    {countryDetails.country} Overview
                  </h2>
                  <p className="text-sm text-gray-700">
                    {countryDetails.description}
                  </p>
                </div>
              )}
            </div>

            {countryDetails && (
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg shadow p-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Weather
                  </h4>
                  <p className="text-xs text-gray-600">
                    Temperature: {countryDetails.weather.temperature}°C
                  </p>
                  <p className="text-xs text-gray-600">
                    Humidity: {countryDetails.weather.humidity}%
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-3">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Economy
                  </h4>
                  <p className="text-xs text-gray-600">
                    GDP: ${Math.round(countryDetails.gdp / 1e9)} Billion
                  </p>
                  <p className="text-xs text-gray-600">
                    Population: {countryDetails.population.toLocaleString()}
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-3 sm:col-span-2">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Popular Cities
                  </h4>
                  <p className="text-xs text-gray-600">
                    {countryDetails.popularCities.join(", ")}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default VisualizationSection;
