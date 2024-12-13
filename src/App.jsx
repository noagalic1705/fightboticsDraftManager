import React from "react";
import "./index.css";
import AddTeam from "./views/addTeam";
import Dashboard from "./views/adminDash";
import LoginPage from "./views/loginPage";
import TeamDash from "./views/teamDash";
import AdminLogin from "./views/adminLogin";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfiguration";
import EditTeam from "./views/editTeam";
import BracketView from "./views/bracketView";

export default function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTeam />} />
        <Route path="teamLogin" element={<LoginPage />} />
        <Route path="teamDash" element={<TeamDash />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route
          path="dashboard"
          element={user ? <Dashboard /> : <AdminLogin />}
        />
        <Route
          path="editTeam/:teamId"
          element={user ? <EditTeam /> : <AdminLogin />}
        />
        <Route path="add" element={user ? <Dashboard /> : <AdminLogin />} />
        <Route path="brackets" element={<BracketView />} />
      </Routes>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
