import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

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
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
      });
  };
  return (
    <div className="face face-right">
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
          <span className="singin" onClick={() => navigate("/login")}>
            Already a user? Sign in
          </span>
        </form>
      </div>
    </div>
  );
};

export default Register;
