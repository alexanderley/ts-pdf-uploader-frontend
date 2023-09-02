import React from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import API_URL from "../../apiKey";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = { name, password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);

      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className="form">
        <label>Name:</label>
        <input type="text" name="name" value={name} onChange={handleEmail} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
      </form>
      {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
};

export default LoginPage;
