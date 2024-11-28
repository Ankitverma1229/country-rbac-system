import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import CountryTable from "../Tables/CountryTable";
import { getAllCountryDetails } from "../../Services/DataServices";

const CountryTableSection = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { role, refreshTable } = useSelector((state) => state.user);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAllCountryDetails();
      if (response && response.data) {
        setData(response.data);
      } else {
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTable]);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Country Details</h1>
      <div className="shadow-md rounded-lg ">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-gray-500 text-center">Loading...</p>
          </div>
        ) : (
          <CountryTable data={data} userRole={role} />
        )}
      </div>
    </section>
  );
};

export default CountryTableSection;
