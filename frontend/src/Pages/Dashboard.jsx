import React, { useEffect, useState, useCallback } from "react";
import { getAllCountryDetails, getCountryDetails } from "../Services/DataServices";
import MetricsSection from "../Components/Sections/MetricsSection";
import VisualizationSection from "../Components/Sections/Visualization";
import { useSelector, useDispatch } from "react-redux";
import { Globe, Wallet, User, PlusIcon } from "lucide-react";
import { setNewEntryState, setModalState } from "../Store/UserSlice";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const { role, refreshTable, country } = useSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const response = await getAllCountryDetails();
    if (response) {
      setData(response.data || []);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTable]);

  useEffect(() => {
    if (selectedCountry || country) {
      const fetchCountryDetails = async () => {
        const response = await getCountryDetails(selectedCountry || country);
        if (response) {
          setCountryDetails(response.data || null);
        }
      };
      fetchCountryDetails();
    }
  }, [selectedCountry, country]);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  const formattedData = data.map((item) => ({
    name: item.country,
    gdp: Math.round(item.gdp / 1e12),
    population: Math.round(item.population / 1e6),
  }));

  const metrics = [
    { title: "Total Countries", value: data.length, icon: Globe },
    {
      title: "Average GDP (Trillions)",
      value: (data.reduce((sum, item) => sum + item.gdp, 0) / 1e12).toFixed(2),
      icon: Wallet,
    },
    {
      title: "Average Population (Millions)",
      value: (
        data.reduce((sum, item) => sum + item.population, 0) /
        data.length /
        1e6
      ).toFixed(2),
      icon: User,
    },
  ];

  return (
    <div className="flex flex-col  pt-3 px-4 md:px-8 pb-5 min-h-screen">
      <section id="dashboard-header" className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-6 md:gap-4">
          <div className="text-left">
            <h1 className="text-2xl font-semibold text-gray-800 tracking-wide">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              An interactive way to explore country statistics
            </p>
          </div>
          <button
            className="flex items-center gap-2 text-white bg-black hover:bg-gray-800 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer px-3 py-2 rounded-lg"
            onClick={() => {
              dispatch(setModalState(true));
              dispatch(setNewEntryState(true));
            }}
          >
            <PlusIcon />
            Add New Country
          </button>
        </div>
      </section>

      <MetricsSection metrics={metrics} />

      <section id="visualization" className="mt-4">
        <VisualizationSection
          data={data}
          formattedData={formattedData}
          selectedCountry={selectedCountry}
          handleCountryChange={handleCountryChange}
          countryDetails={countryDetails}
        />
      </section>
    </div>
  );
};

export default Dashboard;
