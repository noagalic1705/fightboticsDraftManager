
import React from 'react';
import './index.css';
import AddTeam from './views/addTeam';
import Dashboard from './views/adminDash';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router";
import AdminLogin from './views/adminLogin';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfiguration";


export default function App() {
  const [user] = useAuthState(auth);
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AddTeam />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="dashboard" element={user ? <Dashboard /> : <AdminLogin />} />
        <Route path="add" element={user ? <Dashboard /> : <AdminLogin />} />
      </Routes>
    </BrowserRouter>

  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
