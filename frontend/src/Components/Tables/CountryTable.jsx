import React from "react";
import { deleteCountryDetails } from "../../Services/DataServices";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setModalState, setSelectedCountry, triggerTableRefresh } from "../../Store/UserSlice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { verfiyUser } from "../../Services/AuthServices";

const CountryTable = ({ data, userRole }) => {
  const dispatch = useDispatch();

  const handleEdit = (country) => {
    dispatch(setSelectedCountry(country));
    dispatch(setModalState(true));
  };

  const handleDeleteConfirmation = (id) => {
    const toastId = toast(
      <div>
        <p>Are you sure you want to delete this country's details?</p>
        <div className="mt-2 flex justify-end gap-2">
          <button
            onClick={async () => {
              await handleDelete(id, toastId);
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(toastId)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            No
          </button>
        </div>
      </div>,
      {
        closeOnClick: false,
        closeButton: false,
        autoClose: false,
      }
    );
  };

  const handleDelete = async (id, toastId) => {
    await deleteCountryDetails(id);
    dispatch(triggerTableRefresh());
    verfiyUser(dispatch);
    toast.dismiss(toastId);
  };

  return (
    <div className="min-h-screen">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse  shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-center">Country</th>
              <th className="px-4 py-2 text-center">GDP (T)</th>
              <th className="px-4 py-2 text-center">Population (M)</th>
              <th className="px-4 py-2 text-center">Languages</th>
              <th className="px-4 py-2 text-center">Popular Cities</th>
              {(userRole === "Admin" || userRole === "Super Admin") && (
                <th className="px-4 py-2 text-center">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
              >
                <td className="px-4 py-2 text-sm md:text-base text-center">
                  {item.country}
                </td>
                <td className="px-4 py-2 text-sm md:text-base text-center">
                  {(item.gdp / 1e13).toFixed(3)}
                </td>
                <td className="px-4 py-2 text-sm md:text-base text-center">
                  {(item.population / 1e6).toFixed(3)}
                </td>
                <td className="px-4 py-2 text-sm md:text-base text-center">
                  {item.mainLanguages.join(", ")}
                </td>
                <td className="px-4 py-2 text-sm md:text-base text-center">
                  {item.popularCities.join(", ")}
                </td>
                {(userRole === "Admin" || userRole === "Super Admin") && (
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-blue-500 hover:text-blue-700"
                        title="Edit"
                      >
                        <FiEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteConfirmation(item._id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CountryTable;
