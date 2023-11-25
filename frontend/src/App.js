import React from "react";
import "./App.css";
import LoginScreen from "./screens/login";
import JobProfile from "./screens/JobProfile";
import Dashboard from "./screens/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import CreateNotification from "./screens/CreateNotification";
import Register from "./screens/Register";
import Calendar from "./screens/Calendar";
import NavBar from "./components/Navbar";
import { useSelector } from "react-redux";
import AddJobOrCompany from "./components/AddJobOrCompany";
function App() {
  const role = useSelector((state) => state.loginReducer.role);

  return (
    <div className="App">
      <Routes>
        {/* 👇️ redirect to /dashboard when user goes to / */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/jobs"
          element={
            <>
              <NavBar /> <AddJobOrCompany />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <NavBar />
              <Calendar />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <NavBar />
              <Dashboard />
            </>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/createNotification"
          element={
            role === "super-admin" || role === "admin" ? (
              <>
                <NavBar />
                <CreateNotification />
              </>
            ) : (
              <Navigate to="/dashboard"></Navigate>
            )
          }
        />
        <Route
          path="/jobProfile"
          element={
            <>
              <NavBar />
              <JobProfile />
            </>
          }
        />
        <Route
          path="/register"
          element={
            role === "super-admin" ? (
              <>
                <NavBar />
                <Register />
              </>
            ) : (
              <Navigate to="/dashboard"></Navigate>
            )
          }
        />
        {/* 👇️ only match this when no other routes match */}
        <Route path="*" element={<Navigate to="/login"></Navigate>} />
      </Routes>
    </div>
  );
}

export default App;
