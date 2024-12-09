import React, { useState } from "react";
import "../styles/loginPage.css";

const InputField = ({ title, onType }) => {
  return (
    <div className="loginField">
      <h3 className="inputHeadingLogin">{title}</h3>
      <input onChange={onType} className="inputLogin" />
    </div>
  );
};

const LoginPage = () => {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");

  const login = () => {
    console.log("neki kul api poziv ovdje");
  };

  return (
    <section className="login">
      <h1 className="headingLogin">Fightbotics Fight Manager</h1>
      <InputField title="Ime tima" onType={(e) => setName(e.target.value)} />
      <InputField title="Lozinka" onType={(e) => setPass(e.target.value)} />
      <button className="buttonLogin" onClick={login}>
        Prijavi se
      </button>
    </section>
  );
};

export default LoginPage;
