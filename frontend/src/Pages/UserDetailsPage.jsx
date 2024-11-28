import React, { useEffect, useState } from "react";
import { getAllUser, updateUserProfile } from "../Services/UserServices";

const UserDetailsPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUser()
      .then((response) => setUsers(response.data))
      .finally(() => setLoading(false));
  }, []);

  const handleRoleChange = (user) => {
    const newRole = user.role === "Viewer" ? "Admin" : "Viewer";
    updateUserProfile({ role: newRole }, user.id).then(() => {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
      );
    });
  };

  return (
    <div className="p-6  ">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">User Details</h1>
      {loading ? (
        <p className="text-gray-600 text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Name</th>
                <th className="px-4 py-2 text-center">Email</th>
                <th className="px-4 py-2 text-center">Country</th>
                <th className="px-4 py-2 text-center">Role</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    {user.id}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    {user.country || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs md:text-sm font-semibold ${
                        user.role === "Admin" || user.role === "Super Admin"
                          ? "bg-indigo-100 text-indigo-700"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm md:text-base text-center">
                    <button
                      onClick={() => handleRoleChange(user)}
                      className="relative inline-flex items-center w-12 h-6 bg-gray-300 rounded-full focus:outline-none transition-colors"
                    >
                      <span
                        className={`absolute left-1 top-1 w-4 h-4 rounded-full shadow-md transform transition-transform ${
                          user.role === "Admin" || user.role === "Super Admin"
                            ? "translate-x-6 bg-indigo-500"
                            : "translate-x-0 bg-gray-500"
                        }`}
                      ></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
