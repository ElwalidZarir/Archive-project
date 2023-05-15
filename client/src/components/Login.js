import { set } from "mongoose";
import React from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Login = ({ SetIsLogged }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
          navigate("/functions");
        }
        SetIsLogged(true);
        navigate("/functions");
      });

    dispatch(
      login({
        username: username,
        password: password,
        loggedIn: true,
      })
    );
  };

  const paperStyle = {
    padding: "3%",
    height: "45vh",
    width: 350,
    margin: "10% 38% auto",
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
            <Button
              margin="normal"
              sx={{
                marginTop: "35%",
                padding: 1,
                backgroundColor: "#07ad90",
                color: "black",
              }}
              fullWidth
              type="submit"
            >
              Submit
            </Button>{" "}
            <span>Forgot Password? </span>
            <span>Not a user? Sign up</span>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default Login;
