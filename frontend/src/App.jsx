import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/Dashboard";
import UserDetailsPage from "./Pages/UserDetailsPage";
import CountryTableSection from "./Components/Sections/CountryTableSection"
import ErrorPage from "./Pages/ErrorPage";
import ProtectedRoute from "./Routes/ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      }
      >
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        <Route path="users" element={<UserDetailsPage />} />
        <Route path="countries" element={<CountryTableSection />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
