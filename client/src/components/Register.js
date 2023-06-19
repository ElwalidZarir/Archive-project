import React, { useState } from "react";
import { set } from "mongoose";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/userSlice";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [userType, setUserType] = useState();
  const [secretKey, setSecretkey] = useState();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userType === "admin" && secretKey !== "dakshiwar") {
      alert("Invalid secret key!");
    } else {
      fetch("http://localhost:3001/register", {
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
          userType,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
        });
      navigate("/");
    }
  };

  const paperStyle = {
    padding: "3%",
    height: "45vh",
    width: 350,
    margin: "10% 36% auto",
  };
  const textfieldsStyle = {};
  console.log(userType);
  return (
    <>
      <Grid className="face face-front">
        <Paper elevation={10} style={paperStyle} className="content">
          <form onSubmit={handleSubmit}>
            <Grid align="center">
              {" "}
              <h2>Sign up</h2>{" "}
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
                label="Create a password"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
              {userType == "admin" ? (
                <TextField
                  margin="normal"
                  fullWidth
                  type="text"
                  label="Secret key"
                  onChange={(e) => setSecretkey(e.target.value)}
                />
              ) : null}
              <Grid sx={{}}>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    {" "}
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Register as:
                    </FormLabel>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                      onChange={(e) => setUserType(e.target.value)}
                    />
                    <FormControlLabel
                      value="simple user"
                      control={<Radio />}
                      label="Simple user"
                      onChange={(e) => setUserType(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>{" "}
              <Grid>
                <Button
                  margin="normal"
                  sx={{
                    marginTop: "5%",
                    backgroundColor: "#07ad90",
                    color: "black",
                  }}
                  fullWidth
                  type="submit"
                >
                  Register
                </Button>{" "}
              </Grid>{" "}
            </Grid>
          </form>
        </Paper>
      </Grid>

      {/*  <div className="face face-right">
        <div className="content">
          <h2>Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="field-wrapper">
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>username</label>
            </div>
            <div className="field-wrapper">
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>password</label>
            </div>
            <div className="field-wrapper">
              <input
                type="password"
                name="password2"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>re-enter password</label>
            </div>
            <div className="field-wrapper">
              <input type="submit" />
            </div>
            <span className="singin" onClick={() => navigate("/")}>
              Already a user? Sign in
            </span>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default Register;
