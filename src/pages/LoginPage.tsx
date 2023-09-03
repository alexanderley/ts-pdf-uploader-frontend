import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API_URL from "../../apiKey";

const LoginPage: React.FC = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  // const handleLoginSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const requestBody = { name, password };

  //   try {
  //     const response = await axios.post(`${API_URL}/auth/login`, requestBody);
  //     console.log("JWT token", response.data.authToken);

  //     storeToken(response.data.authToken);
  //     authenticateUser();

  //     // Redirect to the upload page after successful login
  //     navigate("/upload");
  //   } catch (error: any) {
  //     console.error(error);
  //     setErrorMessage(error.message);
  //   }
  // };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody = { name, password };

    try {
      const response = await axios.post(`${API_URL}/auth/login`, requestBody);
      console.log("JWT token", response.data.authToken);

      storeToken(response.data.authToken);
      authenticateUser();

      // Redirect to the upload page after successful login
      navigate("/upload");
    } catch (error: any) {
      if (error.response) {
        // If the error has a response from the server
        console.error(error.response.data.message);
        setErrorMessage(error.response.data.message); // Set the error message in your component state
      } else {
        console.error("An error occurred:", error.message);
        setErrorMessage("An error occurred. Please try again."); // Generic error message
      }
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

        <button style={{ width: "100%", marginTop: "5px" }} type="submit">
          Login
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default LoginPage;
