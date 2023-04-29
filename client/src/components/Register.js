import React, { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    fetch("http://localhost:3001/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
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
              name="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>e-mail</label>
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
          <span className="singin">Already a user? Sign in</span>
        </form>
      </div>
    </div>
  );
};

export default Register;
