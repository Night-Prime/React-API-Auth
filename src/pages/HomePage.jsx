import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const HomePage = () => {
  const navigate = useNavigate();
  const [client, setClient] = useState([]);

  const logout = () => {
    navigate('/');
    authService.logOut();
  }

  useEffect(() => {
    authService.request({url: "/clients", method: "GET", data:{client}},((response) => {
      setClient(response.data);
      JSON.stringify(response.data);
      console.log(response.data)
    }))
    // authService.getAllClients().then(
    //   (response) => {
    //     setClient(response.data);
    //     JSON.stringify(response.data);
    //     console.log(response.data);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }, [client, setClient]);

  return (
    <>
      <h1>Welcome to the HomePage</h1>
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
};

export default HomePage;
