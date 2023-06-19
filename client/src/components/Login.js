import { set } from "mongoose";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Login = ({ SetIsLogged, SetIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "logged");

        if (data.data.status === "ok") {
          SetIsLogged(true);
          window.localStorage.setItem("isLoggedIn", true);
        }
        SetIsLogged(true);
        console.log(data.data);
        setUserType(data.data);
        window.localStorage.setItem("isLoggedIn", true);
      });

    window.localStorage.setItem("username", username);
  };

  const paperStyle = {
    padding: "3%",
    height: "45vh",
    width: 350,
    margin: "10% 36% auto",
  };
  const textfieldsStyle = {};

  return (
    <Grid className="face face-front">
      <Paper elevation={10} style={paperStyle} className="content">
        <form onSubmit={handleSubmit}>
          <Grid align="center">
            {" "}
            <h2>Sign in</h2>{" "}
          </Grid>
          <Grid style={textfieldsStyle} sx={{ space: 2 }}>
            <TextField
              id="outlined-password-input"
              label="Username"
              margin="normal"
              autoComplete="current-password"
              type="text"
              name="username"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              type="password"
              name="password"
              margin="normal"
              fullWidth
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Grid>
              <Button
                margin="normal"
                sx={{
                  marginTop: "30%",
                  backgroundColor: "#07ad90",
                  color: "black",
                }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>{" "}
            </Grid>{" "}
            <span>Forgot Password? </span>
            <span>Not a user? Sign up</span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
