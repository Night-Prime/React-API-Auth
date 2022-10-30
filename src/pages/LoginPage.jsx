import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import authService from "../services/authService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await authService.login(email, password).then(
        (response) => {
          console.log('it worked!', response);
         navigate("/home");
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      <br />
        <form onSubmit={handleLogin}>
          <Input 
            type="email" 
            placeholder="Email"
            value={email}
            onChange = {(e) => setEmail(e.target.value)}
             />
          <br />
          <Input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           /><br />
          <Button type="submit" variant="contained">Login</Button>
        </form>
    </>
  );
};

export default LoginPage;
