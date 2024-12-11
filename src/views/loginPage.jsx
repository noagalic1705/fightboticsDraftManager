import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/loginPage.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfiguration";

const InputField = ({ title, onType }) => {
  return (
    <div className="loginField">
      <h3 className="inputHeadingLogin">{title}</h3>
      <input onChange={onType} className="inputLogin" />
    </div>
  );
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [teams, setTeams] = useState([]);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let foundTeam = null;

      teams.forEach((doc) => {
        if (doc.id === username) {
          foundTeam = doc;
        }
      });

      const validPassword = await foundTeam.password;

      if (validPassword != password) {
        setError("Invalid password.");
        return;
      }

      localStorage.setItem("teamData", JSON.stringify(foundTeam));
      navigate("/teamDash");
    } catch (err) {
      setError("An error occurred during login.");
    }
  };

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsSnapshot = await getDocs(collection(db, "teams"));
        const teamDocs = teamsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(teamDocs);
      } catch (error) {
        console.error("Error fetching teams: ", error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <section className="login">
      <h1 className="headingLogin">Fightbotics Fight Manager</h1>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <select
        name="Teams"
        onChange={(e) => setUsername(e.target.value)}
        className="dropdownLogin"
      >
        <option value="">
          Odaberi svoj tim
        </option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.id}
          </option>
        ))}
      </select>
      {/* <InputField title="Ime tima" onType={(e) => setUsername(e.target.value)} /> */}
      <InputField title="Lozinka" onType={(e) => setPassword(e.target.value)} />
      <button className="buttonLogin" onClick={handleLogin}>
        Prijavi se
      </button>
    </section>
  );
};

export default LoginPage;
