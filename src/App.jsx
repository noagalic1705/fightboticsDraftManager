import React from 'react';
import './index.css';
import AddTeam from './views/addTeam';
import Dashboard from './views/adminDash';
import LoginPage from './views/loginPage';
import TeamDash from './views/teamDash';
import AdminLogin from './views/adminLogin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebaseConfiguration";
import EditTeam from './views/editTeam';
import WinnerEdit from './views/winnerEdit';
import WinnerBracket from './views/winnerBracket';
import Populate from './views/editBracket';
import LoserBracket from './views/loserBracket';
import LoserEdit from './views/loserEdit';


export default function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WinnerBracket />} />
        <Route path="teamLogin" element={<LoginPage />} />
        <Route path="teamDash" element={<TeamDash />} />
        <Route path="admin" element={<AdminLogin />} />
        <Route path="dashboard" element={user ? <Dashboard /> : <AdminLogin />} />
        <Route path="editTeam/:teamId" element={user ? <EditTeam /> : <AdminLogin />} />
        <Route path="add" element={user ? <Dashboard /> : <AdminLogin />} />
        <Route path="winnerEdit" element={user ? <WinnerEdit /> : <AdminLogin />} />
        <Route path="winnerBracket" element={<WinnerBracket />} />
        <Route path="loserBracket" element={<LoserBracket />} />
        <Route path="loserEdit" element={user ? <LoserEdit /> : <AdminLogin />} />
        <Route path="addTeam" element={user ? <AddTeam/> : <AdminLogin />}/>
      </Routes>
    </BrowserRouter>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
